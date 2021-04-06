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
    [ActionType.GET_BOARD_DETAIL_ASYNC]: function (state, payload) {
        state.data = payload;
    }
}

/**
 * ACTIONS(비동기 처리)
 */
export const actions = {
    [ActionType.GET_BOARD_DETAIL_ASYNC]: async function (store, payload) {
        await this.$axios.get(`/api-v1/career/${payload}`).then((response) => {
            const {data, status} = response;
            if(status === 200) {
                store.commit(ActionType.GET_BOARD_DETAIL_ASYNC, data.data);
            }
        });
    }
}

/**
 * GETTERS(복사객체 생성)
 */
export const getters = {
    detailData: state => {
        return state.data;
    }
}