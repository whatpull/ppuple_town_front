import ActionType from '~/constants/action-type.js';

/**
 * STATE
 */
export const state = () => ({
    tab: null,
    filter: null,
    editor: null,
    list: []
})

/**
 * MUTATIONS(동기 처리)
 */
export const mutations = {
    [ActionType.CHANGE_BOARD_TYPE_TAB]: function (state, payload) {
        state.tab = payload;
    },

    [ActionType.CHANGE_BOARD_TYPE_FILTER]: function (state, payload) {
        state.filter = payload;
    },

    [ActionType.CHANGE_BOARD_TYPE_EDITOR]: function (state, payload) {
        state.editor = payload;
    },

    [ActionType.GET_BOARD_TYPE_ASYNC]: function (state, payload) {
        state.list = payload;
    }
}

/**
 * ACTIONS(비동기 처리)
 */
export const actions = {
    [ActionType.CHANGE_BOARD_TYPE_TAB]: function (store, payload) {
        store.commit(ActionType.CHANGE_BOARD_TYPE_TAB, payload);
    },

    [ActionType.CHANGE_BOARD_TYPE_FILTER]: function (store, payload) {
        store.commit(ActionType.CHANGE_BOARD_TYPE_FILTER, payload);
    },

    [ActionType.CHANGE_BOARD_TYPE_EDITOR]: function (store, payload) {
        store.commit(ActionType.CHANGE_BOARD_TYPE_EDITOR, payload);
    },

    [ActionType.GET_BOARD_TYPE_ASYNC]: async function(store, payload) {
        await this.$axios.get('/api-v1/career/type/list').then((response) => {
            const {data, status} = response;
            if(status === 200) {
                store.commit(ActionType.GET_BOARD_TYPE_ASYNC, data.data.content);
            }
        });
    }
}

/**
 * GETTERS(복사객체 생성)
 */
export const getters = {
    tab: state => { // 탭(전용)
        return state.tab ? state.tab : state.list[0].ctSeq;
    },

    filter: state => { // 필터(전용)
        const selectboxTypes = state.list.filter(type => type.type !== "ALL");
        return state.filter ? state.filter : selectboxTypes[0].ctSeq;
    },

    editor: state => { // 에디터(전용)
        const selectboxTypes = state.list.filter(type => type.type !== "ALL");
        return state.editor ? state.editor : selectboxTypes[0].ctSeq;
    },
    
    types: state => {
        return state.list;
    }
}