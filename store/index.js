import ActionType from '~/constants/action-type.js';

// 새로고침(서버 랜더링 조회)
export const actions = {
    async nuxtServerInit({ dispatch, getters }, { $cookies }) {
        // Step1. 공통 헤더 세션설정(axios);
        const session = $cookies.get('PTSESSION');
        if(session) {
            // axios 세션 헤더 설정
            if(typeof this.$axios.defaults.headers.common['X-AUTH-TOKEN'] === "undefined") {
                this.$axios.defaults.headers.common['X-AUTH-TOKEN'] = session;
            }
            // 회원정보 조회
            if(getters['user/detail/info'] === null) {
                await dispatch(`user/detail/${ActionType.GET_USER_ASYNC}`);
            }
        } else {
            // axios 세션 헤더 해제
            if(typeof this.$axios.defaults.headers.common['X-AUTH-TOKEN'] === "string") {  
                this.$axios.defaults.headers.common['X-AUTH-TOKEN'] = "";
            }
            // 회원정보 초기화
            if(getters['user/detail/info'] !== null) {
                await dispatch(`user/detail/${ActionType.INIT_USER_ASYNC}`);
            }
        }

        // Step2. SSR 전역 데이터 로더(state)
        await dispatch(`career/board/type/${ActionType.GET_BOARD_TYPE_ASYNC}`);
        await dispatch(`career/board/category/${ActionType.GET_BOARD_CATEGORY_ASYNC}`);
    }
}