<template>
    <v-dialog
        v-model="showProfilePasswordEditorDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable>

        <v-card 
            class="d-flex align-center"
            tile>
            <div class="ProfilePasswordEditor Shadow">
                <div class="Head Shadow">
                    <div class="ButtonLeft">
                        <v-btn
                            width="35px"
                            height="35px"
                            fab
                            color="#FFFFFF"
                            elevation="0"
                            @click="clickButtonBack">
                            <v-icon
                                size="35px"
                                color="#7666D1">
                                navigate_before
                            </v-icon>
                        </v-btn>
                    </div>
                    <div class="Title">
                        비밀번호 변경
                    </div>
                    <div class="ButtonRight"></div>
                </div>
                <div class="Body">
                    <div class="d-flex flex-column justify-center align-center">
                        <form 
                            @submit.prevent="() => { return; }"
                            autocomplete="off"
                            class="mt-4 rounded elevation-1"
                            style="overflow: hidden;">
                            <div>
                                <v-text-field
                                    :value="`${user.email}`"
                                    class="TextFiled"
                                    prefix="변경대상 계정 : "
                                    readonly
                                    disabled
                                    solo>
                                </v-text-field>
                            </div>
                            <div>
                                <v-text-field
                                    v-model="currentPassword"
                                    class="TextFiled"
                                    :append-icon="currentPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="currentPasswordShow ? 'text' : 'password'"
                                    @click:append="currentPasswordShow = !currentPasswordShow"
                                    prefix="기존 비밀번호 : "
                                    color="#7666D1"
                                    solo>
                                </v-text-field>
                            </div>
                            <div>
                                <v-text-field
                                    v-model="newPassword"
                                    class="TextFiled"
                                    :append-icon="newPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="newPasswordShow ? 'text' : 'password'"
                                    @click:append="newPasswordShow = !newPasswordShow"
                                    prefix="신규 비밀번호 : "
                                    color="#7666D1"
                                    solo>
                                </v-text-field>
                            </div>
                            <div>
                                <v-text-field
                                    v-model="confirmPassword"
                                    class="TextFiled"
                                    :append-icon="confirmPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="confirmPasswordShow ? 'text' : 'password'"
                                    @click:append="confirmPasswordShow = !confirmPasswordShow"
                                    prefix="비밀번호 확인 : "
                                    color="#7666D1"
                                    solo>
                                </v-text-field>
                            </div>
                        </form>
                        <div class="caption grey--text text--darken-1 text-center mt-1">
                            8자리 영문+숫자 조합으로 입력해주세요.
                        </div>
                        <div class="mt-4 Button">
                            <v-btn
                                class="font-weight-bold"
                                height="40px"
                                color="#7666D1"
                                depressed
                                dark
                                width="100%"
                                @click="changePassword">
                                비밀번호 변경
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </v-card>

    </v-dialog>
</template>

<script>
    import ActionType from '~/constants/action-type.js';

    import CardMember from '~/components/common/card/CardMember.vue';

    export default {
        props: {
            user: {
                type: Object,
                default: () => {
                    return { }
                }
            },

            showProfilePasswordEditorDialog: {
                type: Boolean,
                default: true
            }
        },

        data() {
            return {
                currentPassword: null,
                currentPasswordShow: false,
                newPassword: null,
                newPasswordShow: false,
                confirmPassword: null,
                confirmPasswordShow: false
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

            validationPassword(password) {
                const regex = /^[a-zA-Z0-9]{8,20}$/;
                return regex.test(password);
            },

            clickButtonBack() {
                this.$emit('clickEditPassword');
            },

            async changePassword() {
                const currentPassword = this.currentPassword;
                const newPassword = this.newPassword;
                const confirmPassword = this.confirmPassword;

                if(!currentPassword) {
                    this.openDialogAlert('기존 비밀번호를<br>입력해 주세요.');
                    return;
                }

                if(!newPassword) {
                    this.openDialogAlert('신규 비밀번호를<br>입력해 주세요.');
                    return;
                }

                if(!confirmPassword) {
                    this.openDialogAlert('비밀번호 확인을<br>입력해 주세요.');
                    return;
                }
                
                if(!this.validationPassword(newPassword)) {
                    this.openDialogAlert('유효한 비밀번호를<br>입력해 주세요.');
                    return;
                }

                if(newPassword !== confirmPassword) {
                    this.openDialogAlert('비밀번호가<br>일치하지 않습니다.');
                    return;
                }

                if(currentPassword === newPassword) {
                    this.openDialogAlert('비밀번호가<br>기존과 동일합니다.');
                    return;
                }

                const mseq = this.user.mseq;
                const payload = {
                    mseq: mseq,
                    currentPassword: currentPassword,
                    password: newPassword,
                }
                await this.$store.dispatch(`user/submit/${ActionType.PUT_USER_PASSWORD_ASYNC}`, payload).then(async (response) => {
                    const {data, status} = response;
                    if(status === 200) {
                        if(data.status === 200) {
                            await this.$store.dispatch(`user/detail/${ActionType.GET_USER_ASYNC}`);
                            this.openDialogAlert('비밀번호가<br>변경되었습니다.');
                            this.clickButtonBack();
                            this.initDialog();
                        } else if(data.status === -6002) {
                            this.openDialogAlert('기존 비밀번호가<br>일치하지 않습니다.');
                        } else {
                            this.openDialogAlert('비밀번호 변경에<br>실패하였습니다.');
                        }
                    }
                });;
            },

            initDialog() {
                this.currentPassword = null;
                this.currentPasswordShow = false;
                this.newPassword = null;
                this.newPasswordShow = false;
                this.confirmPassword = null;
                this.confirmPasswordShow = false;
            }
        },

        beforeDestroy() {
            this.initDialog();
        }
    }
</script>

<style scoped>
    .ProfilePasswordEditor {
        width: 100%;
        height: 100vh;
        max-width: 780px;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }

    .ProfilePasswordEditor .Head {
        flex: 0 0 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px 16px;
    }

    .ProfilePasswordEditor .Head .ButtonLeft,
    .ProfilePasswordEditor .Head .ButtonRight {
        flex: 0 0 35px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .ProfilePasswordEditor .Head .Title {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.25rem;
        font-weight: 700;
        line-height: 2rem;
        letter-spacing: 0.0125em;
        font-family: "dotum";
        color: #7666D1;
    }

    .ProfilePasswordEditor .Body {
        flex: 1;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .ProfilePasswordEditor .Body .Thumbnail {
        width: 150px;
    }

    .ProfilePasswordEditor .Body .TextFiled {
        border-radius: 0;
    }

    .ProfilePasswordEditor .Body .TextFiled /deep/ .v-text-field__details {
        display: none;
    }

    .ProfilePasswordEditor .Body .TextFiled /deep/ .v-input__slot {
        margin-bottom: 0px;
    }

    .ProfilePasswordEditor .Body .Button {
        width: 100%;
    }
</style>