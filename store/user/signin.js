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
    [ActionType.SIGNIN_ASYNC]: async function (store, payload) {
        return await this.$axios.post('/api-v1/signin', payload);
    }
}

/**
 * GETTERS(복사객체 생성)
 */
export const getters = {

}