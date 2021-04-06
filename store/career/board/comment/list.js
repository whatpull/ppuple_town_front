import ActionType from '~/constants/action-type.js';

/**
 * STATE
 */
export const state = () => ({
    addBottomSheetShow: false, // 댓글 등록 바텀 시트 노출여부
    addBottomSheetMode: 'ADD', // ADD, EDIT(등록, 수정)
    addBottomSheetEditSeq: null, // 댓글 수정 시퀀스 넘버(정보 조회용)
    refreshTime: null,
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
    [ActionType.GET_BOARD_DETAIL_COMMENT_LIST]: function (state, payload) {
        if(payload.refreshTime) state.refreshTime = payload.refreshTime;
        state.list = payload.number > 0 ? state.list.concat(payload.content) : payload.content;
        state.page.last = payload.last;
        state.page.number = payload.number;
        state.page.totalElements = payload.totalElements;
    },

    [ActionType.CHANGE_BOARD_DETAIL_COMMENT_EDITOR_SHEET]: function (state, payload) {
        state.addBottomSheetShow = payload.show;
        state.addBottomSheetMode = payload.mode;
        state.addBottomSheetEditSeq = payload.seq;
    }, 

    [ActionType.REPLACE_BOARD_DETAIL_COMMENT_LIST_ITEM]: function (state, payload) {
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
    [ActionType.GET_BOARD_DETAIL_COMMENT_LIST_ASYNC]: async function (store, payload) {
        const refreshTime = this.$moment().format('HH:mm:ss');
        const params = {
            params: {
                cSeq: payload,
                size: 10
            }
        }
        
        await this.$axios.get('/api-v1/career/comment/list', params).then((response) => {
            const {data, status} = response;
            if(status === 200) {
                data.data.refreshTime = refreshTime;
                store.commit(ActionType.GET_BOARD_DETAIL_COMMENT_LIST, data.data);
            }
        });
    },

    [ActionType.GET_BOARD_DETAIL_COMMENT_LIST]: function (store, payload) {
        // payload =>  { cSeq: ?, type: MORE(더보기) }
        const params = {
            params: {
                cSeq: payload.cSeq,
                size: 10
            }
        }

        let last = store.getters.commentsPage.last;
        let page = store.getters.commentsPage.number;
        if(payload.type === "MORE") params.params.page = page + 1;

        if(last === false || page === 0) {
            this.$axios.get('/api-v1/career/comment/list', params).then((response) => {
                const {data, status} = response;
                if(status === 200) {
                    store.commit(ActionType.GET_BOARD_DETAIL_COMMENT_LIST, data.data);
                }
            });
        }
    },
    
    [ActionType.CHANGE_BOARD_DETAIL_COMMENT_EDITOR_SHEET]: function (store, payload) {
        store.commit(ActionType.CHANGE_BOARD_DETAIL_COMMENT_EDITOR_SHEET, payload);
    }
}

/**
 * GETTERS(복사객체 생성)
 */
export const getters = {
    addBottomSheetShow: state => {
        return state.addBottomSheetShow;
    },

    addBottomSheetMode: state => {
        return state.addBottomSheetMode;
    },

    addBottomSheetEditSeq: state => {
        return state.addBottomSheetEditSeq;
    },
    
    refreshTime: state => {
        return state.refreshTime;
    },

    comments: state => {
        return state.list;
    },

    commentsPage: state => {
        return state.page;
    }
}