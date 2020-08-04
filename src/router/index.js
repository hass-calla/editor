import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'boards',
        component: () => import('../views/Boards.vue'),
    },
    {
        path: '/board/:boardId',
        component: () => import('../views/Editor.vue'),

        children: [
            {
                path: '',
                name: 'board',
                component: () => import('../views/EditorBoardForm'),
                meta: {objectType: 'board'}
            },
            {
                path: 'pages/:pageId',
                name: 'page',
                component: () => import('../views/EditorPageForm'),
                meta: {objectType: 'page'}
            },
            {
                path: 'pages/:pageId/groups/:groupId',
                name: 'group',
                component: () => import('../views/EditorGroupForm'),
                meta: {objectType: 'group'}
            },
            {
                path: 'pages/:pageId/groups/:groupId/tiles/:tileId',
                name: 'tile',
                component: () => import('../views/EditorTileForm'),
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

    store.commit('updateCurrentObject', to.meta.objectType);

    next();
});

export default router;
