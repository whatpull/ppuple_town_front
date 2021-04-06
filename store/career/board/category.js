import ActionType from '~/constants/action-type.js';

/**
 * STATE
 */
export const state = () => ({
    filter: null,
    editor: null,
    list: []
})

/**
 * MUTATIONS(동기 처리)
 */
export const mutations = {
    [ActionType.CHANGE_BOARD_CATEGORY_FILTER]: function (state, payload) {
        state.filter = payload;
    },

    [ActionType.CHANGE_BOARD_CATEGORY_EDITOR]: function (state, payload) {
        state.editor = payload;
    },

    [ActionType.GET_BOARD_CATEGORY_ASYNC]: function (state, payload) {
        state.list = payload;
    }
}

/**
 * ACTIONS(비동기 처리)
 */
export const actions = {
    [ActionType.CHANGE_BOARD_CATEGORY_FILTER]: function (store, payload) {
        store.commit(ActionType.CHANGE_BOARD_CATEGORY_FILTER, payload);
        if(payload) store.commit(`career/board/list/${ActionType.INIT_BOARD_LIST}`, undefined, {root: true});
        store.dispatch(`career/board/list/${ActionType.GET_BOARD_LIST}`, undefined, {root: true});
    },

    [ActionType.CHANGE_BOARD_CATEGORY_EDITOR]: function (store, payload) {
        store.commit(ActionType.CHANGE_BOARD_CATEGORY_EDITOR, payload);
    },

    [ActionType.GET_BOARD_CATEGORY_ASYNC]: async function(store, payload) {
        await this.$axios.get('/api-v1/career/category/list').then((response) => {
            const {data, status} = response;
            if(status === 200) {
                store.commit(ActionType.GET_BOARD_CATEGORY_ASYNC, data.data.content);
            }
        });
    }
}

/**
 * GETTERS(복사객체 생성)
 */
export const getters = {
    filter: state => { // 필터(전용)
        return state.filter ? state.filter : state.list[0].ccSeq;
    },

    editor: state => { // 에디터(전용)
        return state.editor ? state.editor : state.list[0].ccSeq;
    },

    categories: state => {
        return state.list;
    }
}