import ActionType from '~/constants/action-type.js';

 // 클라이언트 라우트 이동(미들웨어)
export default async function ({ $cookies, $axios, store, route, redirect }) {
    const session = $cookies.get('PTSESSION');
    if(session) {
        // axios 세션 헤더 설정
        if(typeof $axios.defaults.headers.common['X-AUTH-TOKEN'] === "undefined") {
            $axios.defaults.headers.common['X-AUTH-TOKEN'] = session;
        }
        // 회원정보 조회
        if(store.getters['user/detail/info'] === null) {
            await store.dispatch(`user/detail/${ActionType.GET_USER_ASYNC}`);
        }
    } else {
        // axios 세션 헤더 해제
        if(typeof $axios.defaults.headers.common['X-AUTH-TOKEN'] === "string") {  
            $axios.defaults.headers.common['X-AUTH-TOKEN'] = undefined;
        }
        // 회원정보 초기화
        if(store.getters['user/detail/info'] !== null) {
            await store.dispatch(`user/detail/${ActionType.INIT_USER_ASYNC}`);
        }
        // 리다이렉트(이동)
        if(route.path === "/" 
            || route.path.indexOf('/career') > -1
            || route.path === '/signin'
            || route.path === '/signup'
            || /^(\/portfolio\/)([0-9a-zA-Z_\-=]{12})$/.test(route.path)) {
        } else {
            return redirect('/signin');
        }
    }
}