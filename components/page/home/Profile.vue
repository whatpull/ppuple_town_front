<template>
    <div v-if="user">
        <v-card
            class="Profile mx-auto"
            color="#FFFFFF"
            elevation="0"
            tile
            min-width="100%">
            
            <div class="d-flex">
                <div 
                    class="pa-4"
                    @click="clickEditMemberInfo">
                    <card-member
                        :avatar="user.avatar"
                        :account="user.account"
                        :name="user.name"/>
                </div>
                <div class="flex-grow-1"></div>
                <div 
                    class="Button"
                    @click="clickEditPassword">
                    <div class="flex-grow-1 d-flex justify-center align-center">
                        <v-icon color="#7666D1">vpn_key</v-icon>
                    </div>
                    <div class="mb-2">비밀번호</div>
                </div>
                <div 
                    class="Button"
                    @click="clickSignout">
                    <div class="flex-grow-1 d-flex justify-center align-center">
                        <v-icon color="#7666D1">directions_run</v-icon>
                    </div>
                    <div class="mb-2">로그아웃</div>
                </div>
            </div>
        </v-card>
        <profile-editor 
            :user="user"
            :showProfileEditorDialog="showProfileEditorDialog"
            @clickEditMemberInfo="clickEditMemberInfo" />
        <profile-password-editor
            :user="user"
            :showProfilePasswordEditorDialog="showProfilePasswordEditorDialog"
            @clickEditPassword="clickEditPassword" />
    </div>
</template>

<script>
    import ActionType from '~/constants/action-type.js';
    import { mapGetters } from "vuex";

    import CardMember from '~/components/common/card/CardMember.vue';
    import ProfileEditor from '~/components/page/home/ProfileEditor.vue';
    import ProfilePasswordEditor from '~/components/page/home/ProfilePasswordEditor.vue';

    export default {
        components: {
            CardMember
        },

        data() {
            return {
                showProfileEditorDialog: false,
                showProfilePasswordEditorDialog: false
            }
        },

        computed: {
            ...mapGetters({
                user: 'user/detail/info'
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

            clickEditMemberInfo() {
                this.showProfileEditorDialog = !this.showProfileEditorDialog;
            },

            clickEditPassword() {
                this.showProfilePasswordEditorDialog = !this.showProfilePasswordEditorDialog;
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
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>
    .Profile {
        border-bottom: 1px solid #E9E9E9 !important;
    }

    .Profile .Button {
        flex: 0 0 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        color: #7666D1;
        border-left: 1px solid #E9E9E9;
        padding: 0 10px;
        cursor: pointer;
    }
</style>