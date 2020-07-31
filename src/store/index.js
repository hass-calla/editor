import Vue from 'vue';
import Vuex from 'vuex';

import Api from '../api';

Vue.use(Vuex);

const store = {
  state: {
    loading: false,
    saving: false,

    ready: false,
    entities: {},

    components: [],

    devices: [
      {
        name: "Living Room",
        id: "d1",
        fullyIntegration: {
          enable: false,
          devices: [
            {url: "", pass: ""}
          ]
        },
        background: {
          type: "solid",
          "color": "#000000",
          "autoplayDuration": 1500,
          "images": [
            "https://picsum.photos/500/300?image=15",
            "https://picsum.photos/500/300?image=25",
            "https://picsum.photos/500/300?image=35",
            "https://picsum.photos/500/300?image=45",
            "https://picsum.photos/500/300?image=55",
          ]
        }
      }
    ],
    pages: [
      {
        name: "Home",
        icon: "",
        id: "p1",
        background: {
          active: true,
          type: "solid",
          "color": "#ffffff",
          "autoplayDuration": 1500,
          "images": []
        }
      },
      {
        name: "Cameras",
        icon: "",
        id: "p2",
        background: {
          active: false
        }
      }
    ],
    groups: [
      {
        name: "Overview",
        nameVisible: false,
        icon: "",
        id: "g1",
      },
      {
        name: "Lights",
        nameVisible: true,
        icon: "",
        id: "g2",
      }
    ],
    tiles: [
      {
        name: "Tile 1",
        icon: "",
        id: "t1",
        type: "light",
        entityId: []
      },
      {
        name: "Tile 2",
        icon: "",
        id: "t2",
        type: "",
        entityId: [],
        style: {
          width: 1,
          height: 1
        },
        actions: {
          toggle: {
            domain: "light",
            service: "toggle",
            data: {}
          }
        }
      }
    ],

    currentDeviceId: null,
    currentPageId: null,
    currentGroupId: null,
    currentTileId: null,

  },

  getters: {
    devices: (state) => state.devices,
    pages: (state) => state.pages,
    groups: (state) => state.groups,
    tiles: (state) => state.tiles,
    entities: (state) => state.entities,
    entityNames: (state) => Object.keys(state.entities),
    components: (state) => state.components,
    componentNames: (state) => state.components.map(c => c.name),

    device: (state) => (id) => state.devices.find(device => device.id === id),
    page: (state) => (id) => state.pages.find(page => page.id === id),
    group: (state) => (id) => state.groups.find(group => group.id === id),
    tile: (state) => (id) => state.tiles.find(tile => tile.id === id),
    component: (state) => (name) => state.components.find(component => component.name === name),
    entity: (state) => (id) => state.entities[id] || null,
  },

  mutations: {
    updateObject(state, {type, object}) {
      let index = (state[`${type}s`] || []).findIndex(o => o.id === object.id);

      if(index < 0) {
        throw new Error(`${type} with the ID ${object.id} not found!`);
      }

      state[`${type}s`][index] = {...object};
    },

    addObject(state, {type, object}) {
      let exists = (state[`${type}s`] || []).find(o => o.id === object.id);

      if(exists) {
        throw new Error(`${type} with the ID ${object.id} exits!`);
      }

      state[`${type}s`].push(object);
    },

    deleteObject(state, {type, object}) {
      if(typeof object !== 'object') {
        object = {id: object};
      }

      let index = (state[`${type}s`] || []).findIndex(o => o.id === object.id);

      if(index < 0) {
        throw new Error(`${type} with the ID ${object.id} not found!`);
      }

      state[`${type}s`].splice(index, 1);
    },

    appReady(state) {
      state.ready = true;
    },

    updateEntities(state, entityState) {
      state.entities = entityState;
    },

    setComponents(state, components) {
      state.components = components;
    }

  },

  actions: {

    async loadComponents({state, commit}) {
      const api = new Api;

      if(state.components.length > 0) {
        return;
      }

      commit('setComponents', (await api.get('components')).data());
    }

  }
};

export default new Vuex.Store(store);
