import ActionType from '~/constants/action-type.js';

/**
 * STATE
 */
export const state = () => ({
    // [리스트] 로딩
    loading: false,

    // [리스트] 전체
    listTypeAll: [],
    pageTypeAll: {
        last: true,
        number: 0
    },

    // [리스트] 질문하기
    listTypeQuestion: [],
    pageTypeQuestion: {
        last: true,
        number: 0
    },

    // [리스트] 정보공유
    listTypeShare: [],
    pageTypeShare: {
        last: true,
        number: 0
    },

    // [리스트] 멤버모집(자유)
    listTypeFree: [],
    pageTypeFree: {
        last: true,
        number: 0
    }
})

/**
 * MUTATIONS(동기 처리)
 */
export const mutations = {
    [ActionType.CHANGE_BOARD_LIST_LOADING]: function(state, payload) {
        state.loading = payload;
    },

    [ActionType.GET_BOARD_LIST_TYPE_ALL_ASYNC]: function (state, payload) {
        state.listTypeAll = payload.number > 0 ? state.listTypeAll.concat(payload.content) : payload.content;
        state.pageTypeAll.last = payload.last;
        state.pageTypeAll.number = payload.number;
    },

    [ActionType.GET_BOARD_LIST_TYPE_QUESTION_ASYNC]: function (state, payload) {
        state.listTypeQuestion = payload.number > 0 ? state.listTypeQuestion.concat(payload.content) : payload.content;
        state.pageTypeQuestion.last = payload.last;
        state.pageTypeQuestion.number = payload.number;
    },

    [ActionType.GET_BAORD_LIST_TYPE_SHARE_ASYNC]: function (state, payload) {
        state.listTypeShare = payload.number > 0 ? state.listTypeShare.concat(payload.content) : payload.content;
        state.pageTypeShare.last = payload.last;
        state.pageTypeShare.number = payload.number;
    },

    [ActionType.GET_BAORD_LIST_TYPE_FREE_ASYNC]: function (state, payload) {
        state.listTypeFree = payload.number > 0 ? state.listTypeFree.concat(payload.content) : payload.content;
        state.pageTypeFree.last = payload.last;
        state.pageTypeFree.number = payload.number;
    }, 

    [ActionType.INIT_BOARD_LIST]: function (state, payload) {
        state.listTypeAll = [];
        state.pageTypeAll = {
            last: true,
            number: 0
        };

        state.listTypeQuestion = [];
        state.pageTypeQuestion = {
            last: true,
            number: 0
        };

        state.listTypeShare = [];
        state.pageTypeShare = {
            last: true,
            number: 0
        };

        state.listTypeFree = [];
        state.pageTypeFree = {
            last: true,
            number: 0
        };
    }
}

/**
 * ACTIONS(비동기 처리)
 */
export const actions = {
    [ActionType.GET_BOARD_LIST_ASYNC]: async function(store, payload) {
        const ccSeq = store.rootState.career.board.category.filter;
        const ctSeq = store.rootState.career.board.type.tab;
        const params = {
            params: {
                ctSeq: ctSeq,
                ccSeq: ccSeq,
                size: 10
            }
        }

        let last = true;
        let page = 0;
        switch(ctSeq) {
            case 1: // 전체
                last = store.getters.pageTypeAll.last;
                page = store.getters.pageTypeAll.number;
                break;
            case 2: // 질문하기
                last = store.getters.pageTypeQuestion.last;
                page = store.getters.pageTypeQuestion.number;
                break;
            case 3: // 정보공유
                last = store.getters.pageTypeShare.last;
                page = store.getters.pageTypeShare.number;
                break;
            case 4: // 멤버모집
                last = store.getters.pageTypeFree.last;
                page = store.getters.pageTypeFree.number;
                break;
            default: // 전체
                last = store.getters.pageTypeAll.last;
                page = store.getters.pageTypeAll.number;
                break;
        }
        
        if(last === false || page === 0 || payload === 'FORCE') {
            await this.$axios.get('/api-v1/career/list', params).then((response) => {
                const {data, status} = response;
                if(status === 200) {
                    switch(ctSeq) {
                        case 1: // 전체
                            store.commit(ActionType.GET_BOARD_LIST_TYPE_ALL_ASYNC, data.data);
                            break;
                        case 2: // 질문하기
                            store.commit(ActionType.GET_BOARD_LIST_TYPE_QUESTION_ASYNC, data.data);
                            break;
                        case 3: // 정보공유
                            store.commit(ActionType.GET_BAORD_LIST_TYPE_SHARE_ASYNC, data.data);
                            break;
                        case 4: // 멤버모집
                            store.commit(ActionType.GET_BAORD_LIST_TYPE_FREE_ASYNC, data.data);
                            break;
                        default: // 전체
                            store.commit(ActionType.GET_BOARD_LIST_TYPE_ALL_ASYNC, data.data);
                            break;
                    }
                }
            });
        }
    },

    [ActionType.GET_BOARD_LIST]: function(store, payload) {
        const ccSeq = store.rootState.career.board.category.filter;
        const ctSeq = store.rootState.career.board.type.tab;
        const params = {
            params: {
                ctSeq: ctSeq,
                ccSeq: ccSeq,
                size: 10
            }
        }

        let last = true;
        let page = 0;
        switch(ctSeq) {
            case 1: // 전체
                last = store.getters.pageTypeAll.last;
                page = store.getters.pageTypeAll.number;
                break;
            case 2: // 질문하기
                last = store.getters.pageTypeQuestion.last;
                page = store.getters.pageTypeQuestion.number;
                break;
            case 3: // 정보공유
                last = store.getters.pageTypeShare.last;
                page = store.getters.pageTypeShare.number;
                break;
            case 4: // 멤버모집
                last = store.getters.pageTypeFree.last;
                page = store.getters.pageTypeFree.number;
                break;
            default: // 전체
                last = store.getters.pageTypeAll.last;
                page = store.getters.pageTypeAll.number;
                break;
        }
        if(payload && payload.type === "MORE") params.params.page = page + 1;
        
        if(last === false || page === 0 || ctSeq === 1) {
            this.$axios.get('/api-v1/career/list', params).then((response) => {
                const {data, status} = response;
                if(status === 200) { 
                    switch(ctSeq) { // 결과처리
                        case 1: // 전체
                            store.commit(ActionType.GET_BOARD_LIST_TYPE_ALL_ASYNC, data.data);
                            break;
                        case 2: // 질문하기
                            store.commit(ActionType.GET_BOARD_LIST_TYPE_QUESTION_ASYNC, data.data);
                            break;
                        case 3: // 정보공유
                            store.commit(ActionType.GET_BAORD_LIST_TYPE_SHARE_ASYNC, data.data);
                            break;
                        case 4: // 멤버모집
                            store.commit(ActionType.GET_BAORD_LIST_TYPE_FREE_ASYNC, data.data);
                            break;
                        default: // 전체
                            store.commit(ActionType.GET_BOARD_LIST_TYPE_ALL_ASYNC, data.data);
                            break;
                    }
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
    // [리스트] 로딩
    loading: state => {
        return state.loading;
    },

    // [리스트] 전체
    listTypeAll: state => {
        return state.listTypeAll;
    },
    pageTypeAll: state => {
        return state.pageTypeAll;
    },

    // [리스트] 질문하기
    listTypeQuestion: state => {
        return state.listTypeQuestion;
    },
    pageTypeQuestion: state => {
        return state.pageTypeQuestion;
    },

    // [리스트] 정보공유
    listTypeShare: state => {
        return state.listTypeShare;
    },
    pageTypeShare: state => {
        return state.pageTypeShare;
    },

    // [리스트] 멤버모집(자유)
    listTypeFree: state => {
        return state.listTypeFree;
    },
    pageTypeFree: state => {
        return state.pageTypeFree;
    }
}