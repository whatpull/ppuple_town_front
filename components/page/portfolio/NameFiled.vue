<template>
    <v-text-field
        v-model="title"
        class="PortfolioName px-3"
        :class="{'Share': isNonSignin}"
        placeholder="포트폴리오 이름을 입력해주세요"
        solo
        rounded
        height="calc(100% - 20px)"
        style="margin: 10px 10px 0 10px"
        :append-icon="isNonSignin ? '' : 'arrow_circle_up'"
        color="#594DA1"
        :readonly="isNonSignin"
        :disabled="isNonSignin"
        @blur="blurUpdateComment"
        @keyup="keyupEnterUpdateComment"
        @click:append="clickNameSave">
    </v-text-field>
</template>

<script>
    import ActionType from '~/constants/action-type.js';
    import { mapGetters } from "vuex";

    export default {
        props: {
            detailData: {
                type: Object,
                default: () => {
                    return { }
                }
            },

            isNonSignin: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                title: this.detailData ? this.detailData.title : ''
            }
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

            blurUpdateComment(event) {
                event.preventDefault();
                this.update();
            },

            keyupEnterUpdateComment(event) {
                event.preventDefault();
                if (event.keyCode == 13) {
                    this.update();
                }
            },

            clickNameSave() {
                this.update();
            },

            async update() {
                const title = this.title;
                if(title) {
                    if(title.length <= 30) {
                        const payload = JSON.parse(JSON.stringify(this.detailData));
                        payload.title = title;
                        await this.$store.dispatch(`portfolio/submit/${ActionType.PUT_PORTFOLIO_USER_ASYNC}`, payload);
                    } else {
                        this.openDialogAlert('30자 이내로<br>작성해주세요.');
                        this.title = title.substring(0, 30);
                    }
                } else {
                    this.openDialogAlert('제목을<br>입력해 주세요.');
                }
            }
        }
    }
</script>

<style scoped>
    .PortfolioName /deep/ .v-text-field__details {
        display: none;
    }

    .PortfolioName /deep/ .v-input__slot {
        box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.05),
            0px 1px 2px 0px rgba(0, 0, 0, 0.05) !important;
    }

    .PortfolioName /deep/ .v-icon.v-icon {
        color: #E2E2E2;
    }

    .PortfolioName.Share /deep/ input {
        text-align: center;
        font-weight: bold;
        font-size: 25px;
        color: #000000;
    }

    .PortfolioName.Share /deep/ .v-input__slot {
        box-shadow: none !important;
    }
</style>