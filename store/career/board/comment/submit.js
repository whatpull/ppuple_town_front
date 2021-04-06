import ActionType from '~/constants/action-type.js';

/**
 * STATE
 */
export const state = () => ({

})

/**
 * MUTATIONS(동기 처리)
 */
export const mutations = {

}

/**
 * ACTIONS(비동기 처리)
 */
export const actions = {
    [ActionType.POST_BOARD_COMMENT_ASYNC]: async function (store, payload) {
        await this.$axios.post('/api-v1/api/career/comment', payload).then((response) => {
            const {data, status} = response;
            if(status === 200) {
                store.dispatch(`career/board/comment/list/${ActionType.GET_BOARD_DETAIL_COMMENT_LIST_ASYNC}`, payload.career.cseq, {root: true});
            }
        });
    },

    [ActionType.PUT_BOARD_COMMENT_ASYNC]: async function (store, payload) {
        await this.$axios.put('/api-v1/api/career/comment', payload).then((response) => {
            const {data, status} = response;
            if(status === 200) {
                store.commit(`career/board/comment/list/${ActionType.REPLACE_BOARD_DETAIL_COMMENT_LIST_ITEM}`, data.data, {root: true});
                store.commit(`user/career/comment/${ActionType.REPLACE_USER_BOARD_COMMENT_LIST_ITEM}`, data.data, {root: true});
            }
        });
    },

    [ActionType.REMOVE_BAORD_COMMENT_ASYNC]: async function (store, payload) {
        await this.$axios.put('/api-v1/api/career/comment/remove', { cmSeq: payload.cmSeq }).then((response) => {
            const {data, status} = response;
            if(status === 200) {
                store.dispatch(`career/board/comment/list/${ActionType.GET_BOARD_DETAIL_COMMENT_LIST_ASYNC}`, payload.cseq, {root: true});
                store.dispatch(`user/career/list/${ActionType.GET_USER_BOARD_LIST_ASYNC}`, { mseq: payload.mseq }, {root: true});
                store.dispatch(`user/career/comment/${ActionType.GET_USER_COMMENT_LIST_ASYNC}`, { mseq: payload.mseq }, {root: true});
            }
        });
    }
}

/**
 * GETTERS(복사객체 생성)
 */
export const getters = {

}