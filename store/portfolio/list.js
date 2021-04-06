import ActionType from '~/constants/action-type.js';

/**
 * STATE
 */
export const state = () => ({
    list: [],
    page: {
        last: true,
        number: 0,
        totalElements: 0
    }
})

/**
 * MUTATIONS(동기 처리)
 */
export const mutations = {
    [ActionType.GET_PORTFOLIO_LIST]: function (state, payload) {
        state.list = payload.number > 0 ? state.list.concat(payload.content) : payload.content;
        state.page.last = payload.last;
        state.page.number = payload.number;
        state.page.totalElements = payload.totalElements;
    },

    [ActionType.ADD_PORTFOLIO_LIST_ITEM]: function (state, payload) {
        if(state.page.last) {
            state.list = state.list.concat(payload);
            state.page.totalElements = state.page.totalElements + 1;
        }
    },

    [ActionType.REPLACE_PORTFOLIO_LIST_ITEM]: function (state, payload) {
        const index = state.list.findIndex((item) => {
            return item.pseq === payload.pseq
        });
        state.list.splice(index, 1, payload);
    }
}

/**
 * ACTIONS(비동기 처리)
 */
export const actions = {
    [ActionType.GET_PORTFOLIO_LIST_ASYNC]: async function (store, payload) {
        const params = {
            params: {
                size: 10
            }
        }

        await this.$axios.get(`/api-v1/portfolio/list/${payload}`, params).then((response) => {
            const {data, status} = response;
            if(status === 200) {
                store.commit(ActionType.GET_PORTFOLIO_LIST, data.data);
            }
        });
    },

    [ActionType.GET_PORTFOLIO_LIST]: function (store, payload) {
        // payload =>  { pmSeq: ?, type: MORE(더보기) }
        const params = {
            params: {
                size: 10
            }
        }

        let last = store.getters.portfolioPage.last;
        let page = store.getters.portfolioPage.number;
        if(payload && payload.type === "MORE") params.params.page = page + 1;

        if(last === false || page === 0) {
            this.$axios.get(`/api-v1/portfolio/list/${payload.pmSeq}`, params).then((response) => {
                const {data, status} = response;
                if(status === 200) {
                    store.commit(ActionType.GET_PORTFOLIO_LIST, data.data);
                }
                if(payload && typeof payload.callback === "function") payload.callback();
            });
        } else {
            if(payload && typeof payload.callback === "function") payload.callback();
        }
    }
}

/**
 * GETTERS(복사객체 생성)
 */
export const getters = {
    portfolioList: state => {
        return state.list;
    },

    portfolioPage: state => {
        return state.page;
    }
}