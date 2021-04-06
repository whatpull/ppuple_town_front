<template>
    <v-dialog
        v-model="showCareerBoardEditorDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable>
        
        <v-card 
            class="d-flex align-center"
            tile>
            <div class="CareerBoardEditor Shadow">
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
                        {{ headTitle }}
                    </div>
                    <div class="ButtonRight"></div>
                </div>
                <div class="Body">
                    <input type="hidden">
                    <v-card
                        class="Content rounded-lg"
                        height="100%"
                        elevation="1">
                        <div class="Title pa-2">
                            <form 
                                @submit.prevent="() => { return; }"
                                autocomplete="off">
                                <v-text-field
                                    dense
                                    class="TitleTextFiled"
                                    v-model="title"
                                    color="#7666D1"
                                    placeholder="제목"
                                    outlined>
                                </v-text-field>
                            </form>
                        </div>
                        <div class="SelectboxWrapper px-2 py-1">
                            <career-board-category
                                :type="'EDITOR'"
                                :isDisabled="isCareerBoardSelectboxDisabled" />
                        </div>
                        <div class="SelectboxWrapper px-2 py-1">
                            <career-board-type
                                :type="'EDITOR'"
                                :isDisabled="isCareerBoardSelectboxDisabled" />
                        </div>
                        <div class="EditorWrapper">
                            <!-- 특이사항(:value="content" 값이 동일할 경우 강제 리랜더를 위해 v-if 선언) -->
                            <text-editor
                                v-if="showCareerBoardEditorDialog"
                                :value="content"
                                ref="hteditor"
                                padding="18px"
                                @changeOverlayShow="changeOverlayShow" />
                        </div>
                        <div class="Button">
                            <v-btn
                                class="font-weight-bold text-h6"
                                dark
                                tile
                                width="100%"
                                height="50px"
                                color="#7666D1"
                                @click="clickButtonCareerBoardSave">
                                {{ submitButtonText }}
                            </v-btn>
                        </div>
                    </v-card>
                </div>
            </div>
        </v-card>

        <v-overlay
            :value="overlay">
            <v-progress-circular
                indeterminate
                size="64">
            </v-progress-circular>
        </v-overlay>
    </v-dialog>
</template>

<script>
    import ActionType from '~/constants/action-type.js';
    import { mapGetters } from "vuex";

    // TODO.(앨런 - 연수) 개별적인 리펙토링 필요(필요시)
    // 댓글 에디팅과 달리 (컴포넌트를 필요시점에 각각 호출하도록 적용)
    // 만약 store의 state를 이용한 댓글 방식이 더 편리할 경우 리펙토링을 추친할 예정
    import CareerBoardCategory from '~/components/page/career/selectbox/CareerBoardCategory.vue';
    import CareerBoardType from '~/components/page/career/selectbox/CareerBoardType.vue';
    import TextEditor from '~/components/common/editor/TextEditor.vue';

    export default {
        components: {
            CareerBoardType,
            TextEditor
        },

        props: {
            showCareerBoardEditorDialog: {
                type: Boolean,
                default: false
            },

            detailData: {
                type: Object,
                default: () => {
                    return { }
                }
            },

            type: { // ADD, EDIT(추가, 수정)
                type: String,
                default: 'ADD'
            }
        },

        data() {
            return {
                title: this.detailData.title,
                content: this.detailData.content,
                overlay: false
            }
        },

        computed: {
            ...mapGetters({
                tab: 'career/board/type/tab',
                categoryFilter: 'career/board/category/filter',
                ctSeq: 'career/board/type/editor',
                ccSeq: 'career/board/category/editor',
                user: 'user/detail/info',
                categories: 'career/board/category/categories'
            }),

            headTitle() {
                return this.type == 'EDIT' ? '글수정' : '글쓰기';
            },

            submitButtonText() {
                return this.type == 'EDIT' ? '수정하기' : '올리기';
            },

            isCareerBoardSelectboxDisabled() {
                return this.type == 'EDIT';
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

            clickButtonCareerBoardSave() {
                this.changeOverlayShow(true);
                this.$refs.hteditor.clickButtonCareerBoardSave(async (content) => {
                    const title = this.title;
                    const ccSeq = this.ccSeq;
                    const ctSeq = this.ctSeq;
                    const mseq = this.user ? this.user.mseq : 0;

                    if(mseq === 0) {
                        this.openDialogAlert('로그인이<br>필요합니다.', () => {
                            this.$router.push("/signin");
                        });
                        return;
                    }

                    if(!title) {
                        this.openDialogAlert('제목을<br>입력해 주세요.');
                        return;
                    }

                    if(!content) {
                        this.openDialogAlert('내용을<br>입력해 주세요.');
                        return;
                    }

                    const payload = {
                        title: title,
                        content: content,
                        category: {
                            ccSeq: ccSeq
                        },
                        type: {
                            ctSeq: ctSeq
                        },
                        user: {
                            mseq: mseq
                        }
                    }

                    switch(this.type) {
                        case 'EDIT':
                            payload.cseq = this.detailData.cseq;
                            payload.category.ccSeq = this.detailData.category.ccSeq;
                            payload.type.ctSeq = this.detailData.type.ctSeq;
                            await this.$store.dispatch(`career/board/submit/${ActionType.PUT_BOARD_ASYNC}`, payload);
                            break;
                        default: // ADD
                            await this.$store.dispatch(`career/board/submit/${ActionType.POST_BOARD_ASYNC}`, payload);
                            break;
                    }
                    this.clickButtonBack();
                    this.title = null;
                });
            },

            changeOverlayShow(isShow) {
                this.overlay = isShow;
            },

            clickButtonBack() {
                this.$emit('clickCareerBoardItemActionButton');
            }
        },

        watch: {
            showCareerBoardEditorDialog(value) {
                if(value) {
                    // 에디터 다이얼로그 노출 시
                    this.title = this.detailData.title;
                    this.content = this.detailData.content;
                    // 타입 초기값
                    const type = this.detailData.type ? this.detailData.type.ctSeq : (this.tab === 1 ? null : this.tab);
                    this.$store.dispatch(`career/board/type/${ActionType.CHANGE_BOARD_TYPE_EDITOR}`, type);
                    // 필터 초기값
                    const filter = this.detailData.category ? this.detailData.category.ccSeq : this.categoryFilter;
                    this.$store.dispatch(`career/board/category/${ActionType.CHANGE_BOARD_CATEGORY_EDITOR}`, filter);
                }
            }
        },

        beforeDestroy() {
            this.title = null;
        }
    }
</script>

<style scoped>
    .CareerBoardEditor {
        width: 100%;
        height: 100vh;
        max-width: 780px;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }

    .CareerBoardEditor .Head {
        flex: 0 0 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px 16px;
    }

    .CareerBoardEditor .Head .ButtonLeft,
    .CareerBoardEditor .Head .ButtonRight {
        flex: 0 0 35px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .CareerBoardEditor .Head .Title {
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

    .CareerBoardEditor .Body {
        flex: 1;
        padding: 20px;
    }

    .CareerBoardEditor .Body .Content {
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .CareerBoardEditor .Body .Content .Title {
        flex: 0 0 50px;
        border-bottom: 1px solid #EFECFF;
    }

    .CareerBoardEditor .Body .Content .TitleTextFiled /deep/ .v-text-field__details {
        display: none;
    }

    .CareerBoardEditor .Body .Content .TitleTextFiled /deep/ .v-input__slot {
        margin-bottom: 0px;
    }

    .CareerBoardEditor .Body .Content .TitleTextFiled /deep/  fieldset {
        border-color: #FFFFFF;
    }

    .CareerBoardEditor .Body .Content .TitleTextFiled /deep/ input::placeholder {
        content:attr(placeholder);
        color: rgb(175, 175, 175);
        font-weight: 100;
    }

    .CareerBoardEditor .Body .Content .SelectboxWrapper {
        flex: 0 0 50px;
        border-bottom: 1px solid #EFECFF;
    }

    .CareerBoardEditor .Body .Content .EditorWrapper {
        flex: 1;
    }

    .CareerBoardEditor .Body .Content .Button {
        flex: 0 0 50px;
        border-top: 1px solid #EFECFF;
    }
</style>