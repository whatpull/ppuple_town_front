import AWSConfig from '~/constants/aws-config.js';

export default {
    methods: {
        // 파일 사이즈 체크
        validationFileSizeCheck(file, limit) {
            const size = file.size / 1024 / 1024; // in MB
            let result = true;
            if (size > (limit ? limit : 5)) {
                result = false;
            }
            return result;
        },

        // 파일이름 생성(uuid - random)
        makeRandomFilename(originalFilename) {
            const randomName = this.$uuidv4();
            const extension = originalFilename.substring(originalFilename.lastIndexOf('.') + 1);
            return `${randomName}.${extension}`;
        },

        // 파일 업로드(AWS S3)
        upload(file, filename, type, callback, prefix, prefix_sub) {
            const bucket = AWSConfig.AWS_S3_BUCKET;
            let keyPrefix = this._getPrefixKey(prefix, prefix_sub);
            const newFilename = this.makeRandomFilename(filename);
            const key = `${keyPrefix}${newFilename}`;
            const aws = this.$aws;
            const s3 = new aws.S3({apiVersion: '2006-03-01'});

            const params = {
                Bucket: bucket, 
                Key: key, 
                Body: file,
                ACL: "public-read",
                ContentEncoding: 'base64',
                ContentType: `image/${type}`
            };
            s3.upload(params, function(errro, data) {
                if (errro) {
                    console.log(errro);
                } else {
                    if(typeof callback === "function") callback(data.Location);
                }
            });
        },

        _getPrefixKey(prefix, prefix_sub) {
            let keyPrefix = AWSConfig.AWS_S3_DEFAULT_KEY_PREFIX;
            switch(prefix) {
                case 'CAREER':
                    keyPrefix = AWSConfig.AWS_S3_CAREER_BOARD_KEY_PREFIX;
                    break;
                case 'PORTFOLIO':
                    keyPrefix = AWSConfig.AWS_S3_PORTFOLIO_KEY_PREFIX;
                    break;
                case 'PROFILE':
                    keyPrefix = AWSConfig.AWS_S3_PROFILE_KEY_PREFIX;
                    break;
                default:
                    keyPrefix = AWSConfig.AWS_S3_DEFAULT_KEY_PREFIX;
                    break;
            }
            if(prefix_sub) keyPrefix = keyPrefix + prefix_sub;
            return keyPrefix;
        }
    }
}