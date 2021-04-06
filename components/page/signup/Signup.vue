<template>
    <div class="Signup">
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
                <v-card
                    elevation="0"
                    class="mx-auto d-flex flex-column"
                    width="100%"
                    height="100%"
                    max-width="320px">

                    <v-card-title class="title font-weight-regular justify-space-between">
                        <span>{{ currentTitle }}</span>
                        <v-avatar
                            color="#7666D1"
                            class="text-subtitle-2 white--text font-weight-bold"
                            size="24"
                            v-text="step">
                        </v-avatar>
                    </v-card-title>
                    <v-window
                        touchless
                        class="flex-grow-1" 
                        v-model="step">
                        <v-window-item
                            :value="1">
                            <v-card-text>
                                <v-text-field
                                    v-model="account"
                                    :disabled="passSendCode || passAuth"
                                    :append-icon="passAuth ? 'mdi-account-check' : ''"
                                    class="SignupTextFiled flex-grow-0"
                                    full-width
                                    placeholder="이메일"
                                    filled
                                    rounded
                                    dense
                                    @keyup="keyupEnterSendCodeMailAuth">
                                </v-text-field>
                                <div v-if="passAuth == false">
                                    <div 
                                        v-if="passSendCode == false"
                                        class="d-flex mb-2">
                                        <v-btn
                                            class="font-weight-bold"
                                            height="40px"
                                            color="#7666D1"
                                            depressed
                                            dark
                                            width="100%"
                                            @click="clickSendCodeMailAuth">
                                            인증코드 발송
                                        </v-btn>
                                    </div>
                                    <div 
                                        v-else
                                        class="d-flex">
                                        <v-text-field
                                            v-model="authCodeConfirm"
                                            class="SignupTextFiled flex-grow-0 mr-1"
                                            max-width="80%"
                                            placeholder="인증코드"
                                            filled
                                            rounded
                                            dense>
                                        </v-text-field>
                                        <v-btn
                                            class="AuthButton font-weight-bold"
                                            height="40px"
                                            color="#7666D1"
                                            depressed
                                            dark
                                            max-width="20%"
                                            @click="clickConfirmMailAuth">
                                            <div>인증</div>
                                            <div 
                                                v-if="authTimer"
                                                class="Timmer">
                                                ({{authTimer}})
                                            </div>
                                        </v-btn>
                                    </div>
                                    <div 
                                        v-show="showGoogle"
                                        class="py-2 Splite text-center">
                                        또는
                                    </div>
                                    <v-btn
                                        v-show="showGoogle"
                                        class="SignupButton font-weight-bold"
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
                                        <span class="black--text">구글 회원가입</span>
                                    </v-btn>
                                </div>
                                <div class="caption grey--text text--darken-1 text-center mt-1">
                                    퍼플타운에서 사용하실 이메일을 입력후 인증해주세요.
                                </div>
                            </v-card-text>
                        </v-window-item>

                        <v-window-item :value="2">
                            <v-card-text>
                                <v-text-field
                                    v-model="password"
                                    class="SignupTextFiled flex-grow-0"
                                    :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="passwordShow ? 'text' : 'password'"
                                    @click:append="passwordShow = !passwordShow"
                                    color="#7666D1"
                                    full-width
                                    placeholder="비밀번호"
                                    filled
                                    rounded
                                    dense>
                                </v-text-field>
                                <v-text-field
                                    v-model="passwordConfirm"
                                    class="SignupTextFiled flex-grow-0"
                                    :append-icon="passwordConfirmShow ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="passwordConfirmShow ? 'text' : 'password'"
                                    @click:append="passwordConfirmShow = !passwordConfirmShow"
                                    color="#7666D1"
                                    full-width
                                    placeholder="비밀번호 확인"
                                    filled
                                    rounded
                                    dense>
                                </v-text-field>
                                <div class="caption grey--text text--darken-1 text-center mb-2">
                                    8자리 영문+숫자 조합으로 입력해주세요.
                                </div>
                            </v-card-text>
                        </v-window-item>

                        <v-window-item :value="3">
                            <div class="pa-4 text-center">
                                <h3 class="title font-weight-light">
                                    환영합니다.
                                </h3>
                                <span class="caption grey--text">회원가입을 축하드립니다.</span>
                                <v-img
                                    class="my-5"
                                    contain
                                    height="128"
                                    src="/image/icon/symbol.png"></v-img>
                                <v-btn
                                    class="SigninButton font-weight-bold"
                                    color="#7666D1"
                                    depressed
                                    max-width="170px"
                                    height="44px"
                                    dark
                                    rounded
                                    width="100%"
                                    @click="clickMain">
                                    퍼플타운 들어가기
                                </v-btn>
                            </div>
                        </v-window-item>
                    </v-window>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn
                            class="font-weight-bold"
                            :disabled="step === 1 || step === 3"
                            text
                            @click="step--">
                            이전
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="font-weight-bold white--text"
                            :disabled="step === 3 || passAuth == false"
                            color="#7666D1"
                            depressed
                            @click="clickNext">
                            다음
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </form>
            <div class="Foot">
                이미 회원가입을 하셨나요?
                <a 
                    class="black--text ml-1 font-weight-bold"
                    href="/signin">
                    로그인
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import ActionType from '~/constants/action-type.js';

    export default {
        data() {
            return {
                step: 1,
                account: null,
                password: null,
                passwordShow: false,
                passwordConfirm: null,
                passwordConfirmShow: false,
                finishDate: null,
                authCode: null,
                authCodeConfirm: null,
                authTimer: null,
                authTimerInterval: null,
                showGoogle: false,
                passSendCode: false,
                passAuth: false
            }
        },

        computed: {
            currentTitle () {
                switch (this.step) {
                    case 1: 
                        return '회원가입';
                    case 2: 
                        return '비밀번호';
                    default: 
                        return '가입완료';
                }
            },
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

            countDownTimerCreate() {
                this.finishDate = this.$moment().add(3, 'm').toDate();
                this.authTimerInterval = setInterval(this.countDownTimerShowRemainingTime, 1000);
            },

            countDownTimerShowRemainingTime() {
                const startDate = new Date(); 
                const diffDate = this.finishDate - startDate;
                
                const _second = 1000;
                const _minute = _second * 60;
                const _hour = _minute * 60;

                const min = Math.floor((diffDate % _hour) / _minute); 
                const sec = Math.floor((diffDate % _minute) / _second);
                let minStr = min;
                let secStr = sec;

                if(min < 10) minStr = `0${min}`;
                if(sec < 10) secStr = `0${sec}`;
                this.authTimer = `${minStr}:${secStr}`;

                if (min == 0 && sec == 0) {
                    this.countDownTimerDestroy();
                    this.openDialogAlert('인증 제한 시간이<br> 초과되었습니다.');
                    return;
                }
            },

            countDownTimerDestroy() {
                clearInterval(this.authTimerInterval);
                this.authTimerInterval = null;
                this.finishDate = null;
                this.authCode = null;
                this.authCodeConfirm = null;
                this.passSendCode = false;
                this.passAuth = false;
            },

            async clickSendCodeMailAuth() {
                const account = this.account;
                if(this.validationEmail(account)) {
                    await this.$store.dispatch(`user/signup/${ActionType.SIGNUP_SEND_MAIL_AUTHCODE_ASYNC}`, {
                        to: account,
                        subject: "[퍼플타운] 회원가입 이메일 인증코드입니다."
                    }).then((response) => {
                        const {data, status} = response;
                        if(status === 200) {
                            if(data.status === 200) {
                                this.countDownTimerCreate();
                                this.authCode = data.data;
                                this.passSendCode = true;
                                this.openDialogAlert('이메일 인증코드가<br>발송되었습니다.');
                            } else {
                                this.openDialogAlert(data.data);
                            }
                        } else {
                            this.openDialogAlert(`[이메일 인증 실패]<br>STATUS : ${status}`);
                        }
                    }).catch((error) => {
                        this.openDialogAlert('[이메일 인증 실패]');
                    });
                } else {
                    this.openDialogAlert('올바른 이메일을<br>입력해주세요.');
                }
            },

            keyupEnterSendCodeMailAuth() {
                if (event.keyCode == 13) {
                    this.clickSendCodeMailAuth();
                }
            },

            clickConfirmMailAuth() {
                if(this.authCode == this.authCodeConfirm) {
                    this.countDownTimerDestroy();
                    this.passAuth = true;
                    this.step = 2;
                    this.openDialogAlert('이메일 인증이<br>성공하였습니다.');
                } else {
                    this.openDialogAlert('인증코드가<br>일치하지 않습니다.');
                }
            },

            clickNext() {
                if(this.step == 1 && this.passAuth && this.account) {
                    this.step = 2;
                } else if(this.step == 2 && this.passAuth && this.account) {
                    this.signup();
                }
            },

            async signup() {
                const account = this.account;
                const password = this.password;
                const passwordConfirm = this.passwordConfirm;

                if(!password) {
                    this.openDialogAlert('비밀번호를<br>입력해 주세요.');
                    return;
                }

                if(!passwordConfirm) {
                    this.openDialogAlert('비밀번호 확인을<br>입력해 주세요.');
                    return;
                }

                if(!this.validationPassword(password)) {
                    this.openDialogAlert('유효한 비밀번호를<br>입력해 주세요.');
                    return;
                }

                if(password !== passwordConfirm) {
                    this.openDialogAlert('비밀번호가<br>일치하지 않습니다.');
                    return;
                }

                await this.$store.dispatch(`user/signup/${ActionType.SIGNUP_ASYNC}`, {
                    email: account,
                    password: password
                }).then(async (response) => {
                    const {data, status} = response;
                    if(status === 200) {
                        if(data.status === 200) {
                            this.step = 3;
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
                        } else {
                            this.openDialogAlert(data.data);
                        }
                    } else {
                        this.openDialogAlert(`[회원가입 실패]<br>STATUS : ${status}`);
                    }
                }).catch((error) => {
                    this.openDialogAlert("[회원가입 실패]");
                });
            }
        },

        mounted() {
            if(!this.assAuth || !this.account) this.step = 1;
        },

        wahtch: {
            step(value) {
                if(!this.assAuth || !this.account) this.step = 1;
            }
        },

        beforeDestroy() {
            this.countDownTimerDestroy();
        }
    }
</script>

<style scoped>
    .Signup {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .Signup .Inbox{
        width: 90%;
        height: 530px;
        display: flex;
        flex-direction: column;
    }

    .Signup .Head {
        flex: 0 0 50px;
        display: flex;
        justify-content: center;
    }

    .Signup .Body {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .Signup .Body .Symbol {
        flex: 0 0 155px;
    }

    .Signup .Body .SignupTextFiled {
        width: 100%;
        border-radius: 5px;
    }

    .Signup .Body .SignupTextFiled /deep/ .v-text-field__details {
        display: none;
    }

    .Signup .Body .SignupTextFiled /deep/ .v-input__slot {
        padding: 0 10px;
    }

    .Signup .Body .AuthButton /deep/ .v-btn__content {
        flex-direction: column;
    }

    .Signup .Body .AuthButton .Timmer {
        font-size: 10px;
    }

    .Signup .Body .SignupButton {
        border-radius: 5px;
        font-size: 16px;
    }

    .Signup .Body .Splite {
        font-size: 12px;
        color: #7E7272;
    }

    .Signup .Foot {
        flex: 0 0 40px;
        width: 100%;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }
</style>