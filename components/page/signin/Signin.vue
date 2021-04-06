<template>
    <div class="Signin">
        <div class="Inbox">
            <div class="Head">
                <v-img
                    class="flex-grow-0"
                    style="cursor: pointer;"
                    width="236px"
                    contain
                    height="50px"
                    src="/image/icon/logo.png"
                    @click="clickMain" />
            </div>
            <form 
                @submit.prevent="() => { return; }"
                autocomplete="off"
                class="Body">
                <div class="Symbol mt-3">
                    <v-img
                        contain
                        style="cursor: pointer;"
                        width="144px"
                        height="100%"
                        src="/image/icon/symbol.png"
                        @click="clickMain" />
                </div>
                <div class="TextFiled px-4">
                    <v-text-field
                        v-show="isSignin === true"
                        :value="user ? user.email : ''"
                        :disabled="isSignin"
                        class="SigninTextFiled flex-grow-0"
                        full-width
                        placeholder="이메일"
                        filled
                        rounded
                        dense>
                    </v-text-field>
                    <v-text-field
                        v-show="isSignin === false"
                        v-model="account"
                        class="SigninTextFiled flex-grow-0"
                        full-width
                        placeholder="이메일"
                        filled
                        rounded
                        dense>
                    </v-text-field>
                    <v-text-field
                        v-show="isSignin === false"
                        v-model="password"
                        class="SigninTextFiled flex-grow-0"
                        full-width
                        placeholder="비밀번호"
                        filled
                        rounded
                        type="password"
                        @keyup="keyupEnterSignin"
                        dense>
                    </v-text-field>
                    <div class="FindPassword">
                        <v-btn
                            tile
                            small
                            text
                            @click="clickFindPassword">
                            비밀번호 찾기
                        </v-btn>
                    </div>
                </div>
                <div class="Button mt-2 px-4">
                    <v-btn
                        v-if="isSignin === false"
                        class="SigninButton font-weight-bold"
                        color="#7666D1"
                        depressed
                        max-width="320px"
                        height="44px"
                        dark
                        width="100%"
                        @click="clickSignin">
                        로그인
                    </v-btn>
                    <v-btn
                        v-else
                        class="SigninButton font-weight-bold"
                        color="#7666D1"
                        depressed
                        max-width="320px"
                        height="44px"
                        dark
                        width="100%"
                        @click="clickSignout">
                        로그아웃
                    </v-btn>
                    <div 
                        v-show="showGoogle"
                        class="py-2 Splite">
                        또는
                    </div>
                    <v-btn
                        v-show="showGoogle"
                        class="SigninButton font-weight-bold"
                        color="#C1C1C1"
                        outlined
                        max-width="320px"
                        height="44px"
                        width="100%">
                        <v-img
                            class="mr-2"
                            contain 
                            max-width="22px"
                            max-height="22px"
                            src="/image/icon/login_google.png" />
                        <span class="black--text">구글 로그인</span>
                    </v-btn>
                </div>
            </form>
            <div class="Foot">
                퍼플타운에 처음 오셨나요?
                <a 
                    class="black--text ml-1 font-weight-bold"
                    href="/signup">
                    회원가입
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import ActionType from '~/constants/action-type.js';
    import { mapGetters } from "vuex";

    export default {
        data() {
            return {
                account: null,
                password: null,
                showGoogle: false
            }
        },

        computed: {
            ...mapGetters({
                user: 'user/detail/info',
            }),

            isSignin() {
                return this.user !== null
            }
        },

        methods: {
            clickMain() {
                this.$router.push('/');
            },

            openDialogAlert(message, callback) {
                const payload = {
                    show: true,
                    message: message
                }
                if(typeof callback === "function") payload.btnFunc = callback;
                this.$store.dispatch(`dialog/alert/${ActionType.CHANGE_DIALOG_ALERT}`, payload);
            },

            validationEmail(email) {
                const regex = /\S+@\S+\.\S+/;
                return regex.test(email);
            },

            validationPassword(password) {
                const regex = /^[a-zA-Z0-9]{8,20}$/;
                return regex.test(password);
            },

            clickFindPassword() {
                this.openDialogAlert('개발 진행중입니다.<br>기다려주세요.');
            },

            clickSignout() {
                const payload = {
                    show: true,
                    message: '정말 로그아웃<br>하시겠습니까?',
                    btnYesFunc: () => {
                        this.signout();
                    }
                }
                this.$store.dispatch(`dialog/confirm/${ActionType.CHANGE_DIALOG_CONFIRM}`, payload);
            },

            async signout() {
                // const domain = process.env.NODE_ENV == 'production' ? '.ppuple.com' : undefined;
                const domain = undefined;
                const option = {
                    path: '/'
                }
                if(domain) option.domain = domain;
                this.$cookies.remove('PTSESSION', option);
                if(typeof this.$axios.defaults.headers.common['X-AUTH-TOKEN'] === "string") {  
                    this.$axios.defaults.headers.common['X-AUTH-TOKEN'] = "";
                }
                if(this.$store.getters['user/detail/info'] !== null) {
                    await this.$store.dispatch(`user/detail/${ActionType.INIT_USER_ASYNC}`);
                }
                this.openDialogAlert('로그아웃이<br>완료되었습니다.');
            },

            clickSignin() {
                this.signin();
            },

            keyupEnterSignin(event) {
                if (event.keyCode == 13) {
                    this.signin();
                }
            },

            async signin() {
                const account = this.account;
                const password = this.password;

                if(!account) {
                    this.openDialogAlert('계정(이메일)을<br>입력해 주세요.');
                    return;
                }

                if(!this.validationEmail(account)) {
                    this.openDialogAlert('유효한 이메일을<br>입력해 주세요.');
                    return;
                }

                if(!password) {
                    this.openDialogAlert('비밀번호를<br>입력해 주세요.');
                    return;
                }

                if(!this.validationPassword(password)) {
                    this.openDialogAlert('유효한 비밀번호를<br>입력해 주세요.');
                    return;
                }

                await this.$store.dispatch(`user/signin/${ActionType.SIGNIN_ASYNC}`, {
                    email: account,
                    password: password
                }).then(async (response) => {
                    const {data, status} = response;
                    if(status === 200) {
                        if(data.status === 200) {
                            // const domain = process.env.NODE_ENV == 'production' ? '.ppuple.com' : undefined;
                            const domain = undefined;
                            const option = {
                                path: '/'
                            }
                            if(domain) option.domain = domain;
                            const session = data.data;
                            this.$cookies.set("PTSESSION", session, option);
                            if(typeof this.$axios.defaults.headers.common['X-AUTH-TOKEN'] === "undefined") {
                                this.$axios.defaults.headers.common['X-AUTH-TOKEN'] = session;
                            }
                            await this.$store.dispatch(`user/detail/${ActionType.GET_USER_ASYNC}`);
                            this.openDialogAlert('로그인에<br>성공하였습니다.', () => {
                                this.clickMain();
                            });
                        } else {
                            this.openDialogAlert(data.data);
                        }
                    } else {
                        this.openDialogAlert(`[로그인 실패]<br>STATUS : ${status}`);
                    }
                }).catch((error) => {
                    console.log(error.response);
                    // const domain = process.env.NODE_ENV == 'production' ? '.ppuple.com' : undefined;
                    const domain = undefined;
                    const option = {
                        path: '/'
                    }
                    if(domain) option.domain = domain;
                    this.$cookies.remove('PTSESSION', option);
                    if(typeof this.$axios.defaults.headers.common['X-AUTH-TOKEN'] === "string") {  
                        this.$axios.defaults.headers.common['X-AUTH-TOKEN'] = "";
                    }
                    this.openDialogAlert('[로그인 실패]');
                });
            }
        }
    }
</script>

<style scoped>
    .Signin {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .Signin .Inbox{
        width: 90%;
        height: 530px;
        display: flex;
        flex-direction: column;
    }

    .Signin .Head {
        flex: 0 0 50px;
        display: flex;
        justify-content: center;
    }

    .Signin .Body {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .Signin .Body .Symbol {
        flex: 0 0 155px;
    }

    .Signin .Body .TextFiled {
        width: 100%;
        max-width: 320px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .Signin .Body .TextFiled .FindPassword {
        width: 100%;
        text-align: right;
    }

    .Signin .Body .TextFiled .SigninTextFiled {
        width: 100%;
        border-radius: 5px;
    }

    .Signin .Body .TextFiled .SigninTextFiled /deep/ .v-text-field__details {
        display: none;
    }

    .Signin .Body .TextFiled .SigninTextFiled /deep/ .v-input__slot {
        padding: 0 10px;
    }

    .Signin .Body .SigninButton {
        border-radius: 5px;
        font-size: 16px;
    }
    
    .Signin .Body .Button {
        width: 100%;
        max-width: 320px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .Signin .Body .Button .Splite {
        font-size: 12px;
        color: #7E7272;
    }

    .Signin .Foot {
        flex: 0 0 40px;
        width: 100%;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }
</style>