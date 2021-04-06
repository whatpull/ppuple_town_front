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
    [ActionType.PUT_USER_AVATAR_ASYNC]: async function (store, payload) {
        await this.$axios.put('/api-v1/api/user/avatar', payload).then(async (response) => {
            const {data, status} = response;
            if(status === 200) {
                await store.dispatch(`user/detail/${ActionType.GET_USER_ASYNC}`, undefined, {root: true});
            }
        });
    },

    [ActionType.PUT_USER_NAME_ASYNC]: async function (store, payload) {
        await this.$axios.put('/api-v1/api/user/name', payload).then(async (response) => {
            const {data, status} = response;
            if(status === 200) {
                await store.dispatch(`user/detail/${ActionType.GET_USER_ASYNC}`, undefined, {root: true});
            }
        });
    },

    [ActionType.PUT_USER_PASSWORD_ASYNC]: async function (store, payload) {
        return await this.$axios.put('/api-v1/api/user/password', payload);
    }
}

/**
 * GETTERS(복사객체 생성)
 */
export const getters = {

}