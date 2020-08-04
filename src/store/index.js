import {camelCase, upperFirst} from 'lodash/string';

import Vue from 'vue';
import Vuex from 'vuex';

import Board from '../models/Board';
import Api from '../api';
import Page from "../models/Page";
import Group from "../models/Group";
import Tile from "../models/Tile";
const api = new Api;

Vue.use(Vuex);

const store = {
  state: {
    loading: false,
    saving: false,

    ready: false,
    entities: {},

    components: [],

    boardsLoaded: false,
    boards: [],

    builderTypes: ['board', 'page', 'group', 'tile'],
    displayedObjectType: 'editor',
    currentListObjectType: null
  },

  getters: {
    boards: (state) => state.boards,
    entities: (state) => state.entities,
    entityNames: (state) => Object.keys(state.entities),
    components: (state) => state.components,
    componentNames: (state) => state.components.map(c => c.name),

    board: (state) => (id) => state.boards.find(board => board.id === id),
    component: (state) => (name) => state.components.find(component => component.name === name),
    entity: (state) => (id) => state.entities[id] || null

  },

  mutations: {
    appReady(state) {
      state.ready = true;
    },

    updateEntities(state, entityState) {
      state.entities = entityState;
    },

    setComponents(state, components) {
      state.components = components;
    },

    updateCurrentObject(state, objectType) {
      state.displayedObjectType = objectType;
      state.currentListObjectType = null;

      switch(objectType) {
        case "group":
        case "tile":
          state.currentListObjectType = "tile";
          break;
        case "page":
          state.currentListObjectType = "group";
          break;
        case "board":
          state.currentListObjectType = "page";
          break;
      }
    },

    clearBoards(state) {
      state.currentBoard = null;
      state.boardsLoaded = false;
      state.boards = [];
    },

    setBoards(state, boards) {
      state.boardsLoaded = true;
      state.boards = boards.map(b => new Board(b));
    },

    pushBoard(state, board) {
      if(! (board instanceof Board)) {
        board = new Board(board);
      }

      state.boards.push(board);
    },

    deleteBoard(state, board) {
      if(board instanceof Board) {
        board = board.id;
      }

      let boardIndex = state.boards.findIndex(b => b.id === board);

      if(boardIndex < 0) {
        return;
      }

      state.boards.splice(boardIndex, 1);
    }

  },

  actions: {

    async loadComponents({state, commit}) {
      if(state.components.length > 0) {
        return;
      }

      commit('setComponents', (await api.get('components')).data());
    },

    async loadBoards({state, commit}, refresh = false) {
      if(refresh) {
        commit('clearBoards');
      }

      if(state.boardsLoaded) {
        return true;
      }

      commit('setBoards', (await api.boards()).data());

      return true;
    }

  }
};

export default new Vuex.Store(store);
