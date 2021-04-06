import ActionType from '~/constants/action-type.js';

/**
 * STATE
 */
export const state = () => ({
    // [리스트] 전체
    list: [],
    page: {
        last: true,
        number: 0
    }
})

/**
 * MUTATIONS(동기 처리)
 */
export const mutations = {
    [ActionType.GET_USER_COMMENT_LIST_ASYNC]: function (state, payload) {
        state.list = payload.number > 0 ? state.list.concat(payload.content) : payload.content;
        state.page.last = payload.last;
        state.page.number = payload.number;
    },

    [ActionType.INIT_USER_COMMENT_LIST]: function (state, payload) {
        state.list = [];
        state.page = {
            last: true,
            number: 0
        };
    },

    [ActionType.REPLACE_USER_BOARD_COMMENT_LIST_ITEM]: function (state, payload) {
        const index = state.list.findIndex((item) => {
            return item.cmSeq === payload.cmSeq
        });
        state.list.splice(index, 1, payload);
    }
}

/**
 * ACTIONS(비동기 처리)
 */
export const actions = {
    [ActionType.GET_USER_COMMENT_LIST_ASYNC]: async function(store, payload) {
        const params = {
            params: {
                size: 99
            }
        }

        let last = store.getters.commentsPage.last;
        let page = store.getters.commentsPage.number;
        if(payload.type === "MORE") params.params.page = page + 1;
        
        if(last === false || page === 0) {
            await this.$axios.get(`/api-v1/career/user/comment/list/${payload.mseq}`, params).then((response) => {
                const {data, status} = response;
                if(status === 200) {
                    store.commit(ActionType.GET_USER_COMMENT_LIST_ASYNC, data.data);
                }
            });
        }
    }
}

/**
 * GETTERS(복사객체 생성)
 */
export const getters = {
    comments: state => {
        return state.list;
    },

    commentsPage: state => {
        return state.page;
    }
}