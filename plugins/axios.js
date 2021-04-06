// 플러그인(라이브러리)
export default ({ $cookies, $axios, redirect }) => {
    $axios.onRequest(config => {
        // 공통 요청 처리
        const session = $cookies.get('PTSESSION');
        if(session) {
            if(typeof config.headers.common['X-AUTH-TOKEN'] === "undefined") {
                config.headers.common['X-AUTH-TOKEN'] = session;
            }
        }
    });
  
    $axios.onError(error => {
        // 공통 에러 처리(에러발생시 무조건 쿠키 제거 - 로그인 해제)
        if(error.response.data.message === "AccessDeniedException"
            || error.response.status === 403) { // 시큐리티 권한 에러
            // const domain = process.env.NODE_ENV == 'production' ? '.ppuple.com' : undefined;
            const domain = undefined;
            const option = {
                path: '/'
            }
            if(domain) option.domain = domain;
            $cookies.remove('PTSESSION', option);
            return redirect('/signin');
        } else {
            return redirect('/');
        }
    });
}