<template>
    <div>
        <v-btn
            class="CareerBoardItemAddButton"
            :class="{'Active': showCareerBoardEditorDialog}"
            elevation="5"
            fab
            color="#594DA1"
            width="60px"
            height="60px"
            @click="clickCareerBoardItemAddButton">
            <v-icon
                size="60px"
                color="#FFFFFF">
                add
            </v-icon>
        </v-btn>
        <career-board-editor
            :showCareerBoardEditorDialog="showCareerBoardEditorDialog" 
            @clickCareerBoardItemActionButton="clickCareerBoardItemAddButton" />
    </div>
</template>

<script>
    import ActionType from '~/constants/action-type.js';
    import { mapGetters } from "vuex";

    import CareerBoardEditor from '~/components/page/career/board/editor/CareerBoardEditor.vue';

    export default {
        components: {
            CareerBoardEditor
        }, 

        data() {
            return {
                showCareerBoardEditorDialog: false
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
            
            clickCareerBoardItemAddButton() {
                if(this.user) {
                    this.showCareerBoardEditorDialog = !this.showCareerBoardEditorDialog;
                } else {
                    this.openDialogAlert('로그인이<br>필요합니다.', () => {
                        this.$router.push("/signin");
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .CareerBoardItemAddButton {
        position: fixed;
        bottom: 30px;
        left: calc(50% + 384px - 60px - 30px);
        z-index: 99;
        -webkit-transition: -webkit-transform 0.5s;
        transition: transform 0.5s;
    }

    .CareerBoardItemAddButton.Active {
        -webkit-transform:rotate(45deg);
        transform:rotate(45deg);
    }

    /* 모바일 버튼 위치 고정 */
    @media (max-width: 768px) {
        .CareerBoardItemAddButton {
            left: calc(100% - 60px - 30px);
        }
    }
</style>