<template>
    <v-card 
        class="ma-1"
        elevation="1">
        <v-responsive
            aspect-ratio="1"
            class="d-flex justify-center align-center text-center">
            <!-- 인풋(파일업로더) -->
            <input
                ref="image"
                class="Hide"
                type="file"
                accept="image/*"
                @change="changeImage">

            <v-btn
                elevation="0"
                fab
                color="#594DA1"
                width="100px"
                height="100px"
                @click="clickImageLoad">
                <v-icon
                    size="100px"
                    color="#FFFFFF">
                    add
                </v-icon>
            </v-btn>
        </v-responsive>
    </v-card>
</template>

<script>
    import ActionType from '~/constants/action-type.js';
    import { mapGetters } from "vuex";

    export default {
        mixins: [global],

        computed: {
            ...mapGetters({
                user: 'user/detail/info',
                detailData: 'portfolio/detail/detailData'
            })
        },

        methods: {
            openDialogAlert(message, callback) {
                const payload = {
                    show: true,
                    message: message
                }
                if(typeof callback === "function") payload.btnFunc = callback;
                this.$store.dispatch(`dialog/alert/${ActionType.CHANGE_DIALOG_ALERT}`, payload);
            },

            clickImageLoad() {
                this.$refs.image.click();
            },

            changeImage(event) {
                const file = event.target.files[0];
                if(file) {
                    if(this.validationFileSizeCheck(file)) {
                        const filename = file.name;
                        var reader = new FileReader();
                        reader.onload = function (event) {
                            const base64 = event.target.result;
                            const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
                            const type = base64.split(';')[0].split('/')[1];
                            const callback = async function(path) {
                                if(path) {
                                    const pmSeq = this.detailData.pmSeq;
                                    const payload = {
                                        image: path,
                                        portfolioUser: {
                                            pmSeq: pmSeq
                                        }
                                    }
                                    await this.$store.dispatch(`portfolio/submit/${ActionType.POST_PORTFOLIO_ASYNC}`, payload);
                                }
                            }.bind(this);
                            this.upload(base64Data, filename, type, callback, 'PORTFOLIO', `${this.user.mseq}/`);
                        }.bind(this);
                        reader.readAsDataURL(file);
                    } else {
                        this.openDialogAlert('이미지는 5MB 이하 사이즈만 첨부가 가능합니다.');
                    }
                }
                this.$refs.image.select();
                this.$refs.image.value = "";
            }
        }
    }
</script>

<style scoped>
    .PortfolioListItemAdd {
        width: 100%;
        height: 100%;
    }

    .Hide {
        display: none;
    }
</style>