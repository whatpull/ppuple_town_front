import ActionType from '~/constants/action-type.js';

/**
 * STATE
 */
export const state = () => ({
    list: []
})

/**
 * MUTATIONS(동기 처리)
 */
export const mutations = {
    [ActionType.GET_SEARCH_BOARD_AUTO_COMLETE_LIST]: function (state, payload) {
        state.list = payload;
    },

    [ActionType.INIT_SEARCH_BOARD_AUTO_COMLETE_LIST]: function (state, payload) {
        state.list = [];
    }
}

/**
 * ACTIONS(비동기 처리)
 */
export const actions = {
    [ActionType.GET_SEARCH_BOARD_AUTO_COMLETE_LIST]: function (store, payload) {
        this.$axios.get(`/api-v1/career/list/search`, {
            params: {
                query: payload
            }
        }).then((response) => {
            const {data, status} = response;
            if(status === 200) {
                store.commit(ActionType.GET_SEARCH_BOARD_AUTO_COMLETE_LIST, data.data);
            }
        });
    }
}

/**
 * GETTERS(복사객체 생성)
 */
export const getters = {
    searchAutoComplete: state => {
        return state.list;
    }
}