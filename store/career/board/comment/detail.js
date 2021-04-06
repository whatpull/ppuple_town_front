import ActionType from '~/constants/action-type.js';

/**
 * STATE
 */
export const state = () => ({
    data: {}
})

/**
 * MUTATIONS(동기 처리)
 */
export const mutations = {
    [ActionType.GET_BAORD_DETAIL_COMMENT_DETAIL_ASYNC]: function (state, payload) {
        state.data = payload;
    },
    [ActionType.INIT_BAORD_DETAIL_COMMENT_DETAIL_ASYNC]: function (state, payload) {
        state.data = {};
    }
}

/**
 * ACTIONS(비동기 처리)
 */
export const actions = {
    [ActionType.GET_BAORD_DETAIL_COMMENT_DETAIL_ASYNC]: async function (store, payload) {
        await this.$axios.get(`/api-v1/career/comment/${payload}`).then((response) => {
            const {data, status} = response;
            if(status === 200) {
                store.commit(ActionType.GET_BAORD_DETAIL_COMMENT_DETAIL_ASYNC, data.data);
            }
        });
    },

    [ActionType.INIT_BAORD_DETAIL_COMMENT_DETAIL_ASYNC]: async function (store, payload) {
        store.commit(ActionType.INIT_BAORD_DETAIL_COMMENT_DETAIL_ASYNC, payload);
    }
}

/**
 * GETTERS(복사객체 생성)
 */
export const getters = {
    // [리스트] 전체
    commentDetailData: state => {
        return state.data;
    }
}