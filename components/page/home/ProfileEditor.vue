<template>
    <v-dialog
        v-model="showProfileEditorDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable>

        <v-card 
            class="d-flex align-center"
            tile>
            <div class="ProfileEditor Shadow">
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
                        프로필 수정
                    </div>
                    <div class="ButtonRight"></div>
                </div>
                <div class="Body">
                    <div class="d-flex flex-column justify-center align-center">
                        <div 
                            class="Thumbnail"
                            @click="clickEditAvatar">
                            <!-- 인풋(파일업로더) -->
                            <input
                                ref="image"
                                class="Hide"
                                type="file"
                                accept="image/*"
                                @change="changeImage">

                            <card-member
                                :avatar="user.avatar"
                                :account="user.account"
                                type="xl"/>
                        </div>
                        <form 
                            @submit.prevent="() => { return; }"
                            autocomplete="off"
                            class="mt-4 rounded elevation-1"
                            style="overflow: hidden;">
                            <div>
                                <v-text-field
                                    v-model="name"
                                    class="TextFiled"
                                    prefix="이름 : "
                                    color="#7666D1"
                                    clearable
                                    clear-icon="close"
                                    solo
                                    @blur="blurUpdateUserName"
                                    @keyup="keyupEnterUpdateUserName">
                                </v-text-field>
                            </div>
                            <div>
                                <v-text-field
                                    :value="user.email"
                                    class="TextFiled"
                                    prefix="메일 : "
                                    readonly
                                    disabled
                                    solo>
                                </v-text-field>
                            </div>
                            <div>
                                <v-text-field
                                    :value="user.account"
                                    class="TextFiled"
                                    prefix="계정 : "
                                    readonly
                                    disabled
                                    solo>
                                </v-text-field>
                            </div>
                        </form>
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
        mixins: [global],

        props: {
            user: {
                type: Object,
                default: () => {
                    return { }
                }
            },

            showProfileEditorDialog: {
                type: Boolean,
                default: true
            }
        },

        data() {
            return {
                name: this.user.name
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

            clickButtonBack() {
                this.$emit('clickEditMemberInfo');
            },

            blurUpdateUserName(event) {
                event.preventDefault();
                this.changeName();
            },

            keyupEnterUpdateUserName(event) {
                event.preventDefault();
                if (event.keyCode == 13) {
                    this.changeName();
                }
            },

            clickEditAvatar() {
                this.$refs.image.click();
            },

            changeImage(event) {
                const file = event.target.files[0];
                if(file) {
                    if(this.validationFileSizeCheck(file, 1)) {
                        const filename = file.name;
                        var reader = new FileReader();
                        reader.onload = function (event) {
                            const base64 = event.target.result;
                            const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
                            const type = base64.split(';')[0].split('/')[1];
                            const callback = async function(path) {
                                if(path) {
                                    const mseq = this.user.mseq;
                                    const payload = {
                                        mseq: mseq,
                                        avatar: path,
                                    }
                                    await this.$store.dispatch(`user/submit/${ActionType.PUT_USER_AVATAR_ASYNC}`, payload);
                                }
                            }.bind(this);
                            this.upload(base64Data, filename, type, callback, 'PROFILE', `${this.user.mseq}/`);
                        }.bind(this);
                        reader.readAsDataURL(file);
                    } else {
                        this.openDialogAlert('이미지는 5MB 이하 사이즈만 첨부가 가능합니다.');
                    }
                }
                this.$refs.image.select();
                this.$refs.image.value = "";
            },

            async changeName() {
                const name = this.name;
                if(name) {
                    const mseq = this.user.mseq;
                    const payload = {
                        mseq: mseq,
                        name: name,
                    }
                    await this.$store.dispatch(`user/submit/${ActionType.PUT_USER_NAME_ASYNC}`, payload);
                } else {
                    this.openDialogAlert('이름을<br>입력해 주세요.');
                }
            }
        }
    }
</script>

<style scoped>
    .ProfileEditor {
        width: 100%;
        height: 100vh;
        max-width: 780px;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }
    
    .Hide {
        display: none;
    }

    .ProfileEditor .Head {
        flex: 0 0 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px 16px;
    }

    .ProfileEditor .Head .ButtonLeft,
    .ProfileEditor .Head .ButtonRight {
        flex: 0 0 35px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .ProfileEditor .Head .Title {
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

    .ProfileEditor .Body {
        flex: 1;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .ProfileEditor .Body .Thumbnail {
        width: 150px;
    }

    .ProfileEditor .Body .TextFiled {
        border-radius: 0;
    }

    .ProfileEditor .Body .TextFiled /deep/ .v-text-field__details {
        display: none;
    }

    .ProfileEditor .Body .TextFiled /deep/ .v-input__slot {
        margin-bottom: 0px;
    }
</style>