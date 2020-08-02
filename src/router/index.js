import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'boards',
    component: () => import('../views/Boards.vue'),
  },
    {
        path: 'editor',
        name: 'editor',
        component: () => import('../views/Builder.vue'),

        children: [
            {
                path: ':boardId',
                name: 'board',
                component: () => import('../views/BuilderBoardForm'),
                meta: {objectType: 'board'}
            },
            {
                path: ':boardId/pages/:pageId',
                name: 'page',
                component: () => import('../views/BuilderPageForm'),
                meta: {objectType: 'page'}
            },
            {
                path: ':boardId/pages/:pageId/groups/:groupId',
                name: 'group',
                component: () => import('../views/BuilderGroupForm'),
                meta: {objectType: 'group'}
            },
            {
                path: ':boardId/pages/:pageId/groups/:groupId/tiles/:tileId',
                name: 'tile',
                component: () => import('../views/BuilderTileForm'),
                meta: {objectType: 'tile'}
            },
        ]

    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach(async (to, from, next) => {
    await store.dispatch('loadBoards');

    if(! to.meta || ! to.meta.objectType) {
        to.meta.objectType = "editor";
    }

    switch(to.meta.objectType) {
        case "board":
            await store.dispatch('selectBoard', to.params.boardId);
            break;
        case "page":
            await store.dispatch('selectPage', to.params.pageId);
            break;
        case "group":
            await store.dispatch('selectGroup', to.params.groupId);
            break;
        case "tile":
            await store.dispatch('selectTile', to.params.tileId);
            break;
    }

    store.commit('updateCurrentObject', to.meta.objectType);

    next();
});

export default router;
