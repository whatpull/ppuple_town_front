// 보안상 개별운영되는 파일입니다.(빌드한 사람의 키를 따라갑니다.)
import AWSCredential from '~/constants/aws-credentials.js';
const AWS = require('aws-sdk');

// 혼합(Vue, Context) 주입
export default ({ app }, inject) => {
    // 일반 크리덴셜 사용이 불가합니다.[디폴트]
    // 버킷의 경우 리전이 필요없습니다.
    AWS.config.update({
        accessKeyId: AWSCredential.AWS_ACCESS_KEY_ID,
        secretAccessKey: AWSCredential.AWS_SECRET_ACCESS_KEY,
        region:'ap-northeast-2'
    });

    AWS.config.getCredentials(function(errro) {
        if (errro) { // credentials not loaded
            console.log(errro.stack);
        } else {
            // console.log("AWS Access key :", AWS.config.credentials.accessKeyId);
        }
    });

    inject('aws', AWS);
}