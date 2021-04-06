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
    [ActionType.POST_BOARD_ASYNC]: async function (store, payload) {
        await this.$axios.post('/api-v1/api/career', payload).then((response) => {
            const {data, status} = response;
            if(status === 200) {
                store.dispatch(`career/board/list/${ActionType.GET_BOARD_LIST_ASYNC}`, 'FORCE', {root: true});
            }
        });
    },

    [ActionType.PUT_BOARD_ASYNC]: async function (store, payload) {
        await this.$axios.put('/api-v1/api/career', payload).then((response) => {
            const {data, status} = response;
            if(status === 200) {
                store.dispatch(`career/board/detail/${ActionType.GET_BOARD_DETAIL_ASYNC}`, payload.cseq, {root: true});
            }
        });
    },

    [ActionType.REMOVE_BOARD_ASYNC]: async function (store, payload) {
        return await this.$axios.put('/api-v1/api/career/remove', payload);
    }
}

/**
 * GETTERS(복사객체 생성)
 */
export const getters = {

}