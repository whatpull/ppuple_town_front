import ActionType from '~/constants/action-type.js';

/**
 * STATE
 */
export const state = () => ({
    info: null
})

/**
 * MUTATIONS(동기 처리)
 */
export const mutations = {
    [ActionType.GET_USER_ASYNC]: function (state, payload) {
        state.info = payload;
    },

    [ActionType.INIT_USER_ASYNC]: function (state, payload) {
        state.info = null;
    }
}

/**
 * ACTIONS(비동기 처리)
 */
export const actions = {
    [ActionType.GET_USER_ASYNC]: async function (store, payload) {
        const session = this.$cookies.get('PTSESSION');
        await this.$axios.get('/api-v1/api/user', {
            params: {
                session: session
            }
        }).then((response) => {
            const {data, status} = response;
            if(status === 200) {
                if(data.status === 200) {
                    store.commit(ActionType.GET_USER_ASYNC, data.data);
                }
            }
        });
    },

    [ActionType.INIT_USER_ASYNC]: async function (store, payload) {
        store.commit(ActionType.INIT_USER_ASYNC);
    }
}

/**
 * GETTERS(복사객체 생성)
 */
export const getters = {
    info: state => {
        return state.info;
    }
}