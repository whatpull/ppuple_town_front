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
    [ActionType.POST_PORTFOLIO_ASYNC]: async function (store, payload) {
        await this.$axios.post('/api-v1/api/portfolio', payload).then((response) => {
            const {data, status} = response;
            if(status === 200) {
                if(data.status === 200) {
                    store.commit(`portfolio/list/${ActionType.ADD_PORTFOLIO_LIST_ITEM}`, data.data, {root: true});
                    // store.dispatch(`portfolio/list/${ActionType.GET_PORTFOLIO_LIST_ASYNC}`, data.data.portfolioUser.pmSeq, {root: true});
                }
            }
        });
    },

    [ActionType.PUT_PORTFOLIO_ASYNC]: async function (store, payload) {
        await this.$axios.put('/api-v1/api/portfolio', payload).then((response) => {
            const {data, status} = response;
            if(status === 200) {
                store.commit(`portfolio/list/${ActionType.REPLACE_PORTFOLIO_LIST_ITEM}`, data.data, {root: true});
            }
        });
    },

    [ActionType.PUT_PORTFOLIO_USER_ASYNC]: async function (store, payload) {
        await this.$axios.put('/api-v1/api/portfolio/user', payload).then(async (response) => {
            const {data, status} = response;
            if(status === 200) {
                await store.dispatch(`portfolio/detail/${ActionType.GET_PORTFOLIO_DETAIL_ASYNC}`, payload.pmSeq, {root: true});
            }
        });
    },

    [ActionType.REMOVE_PORTFOLIO_ASYNC]: async function (store, payload) {
        return await this.$axios.put('/api-v1/api/portfolio/remove', payload).then((response) => {
            const {data, status} = response;
            if(status === 200) {
                store.dispatch(`portfolio/list/${ActionType.GET_PORTFOLIO_LIST_ASYNC}`, data.data.portfolioUser.pmSeq, {root: true});
            }
        });
    }
}

/**
 * GETTERS(복사객체 생성)
 */
export const getters = {

}