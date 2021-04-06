<template>
    <div class="TextEditor">
        <div class="Head" v-show="isToolbar">
            <!-- 인풋(파일업로더) -->
            <input
                ref="image"
                class="Hide"
                type="file"
                accept="image/*"
                @change="changeImage">

            <!-- 버튼(이미지 업로드) -->
            <v-btn
                small
                width="48px"
                height="48px"
                elevation="0"
                class="ma-2"
                color="#F5F5F5"
                @click="clickImageLoad">
                <v-icon size="30px">
                    insert_photo
                </v-icon>
            </v-btn>

            <!-- 버튼(볼드) -->
            <v-btn
                small
                width="48px"
                height="48px"
                elevation="0"
                class="my-2 mr-2"
                :color="colorTextBold"
                :dark="colorTextBold === '#7666D1' ? true : false"
                @click="clickTextBold">
                <v-icon size="30px">
                    format_bold
                </v-icon>
            </v-btn>

            <!-- 버튼(좌측 정렬) -->
            <v-btn
                small
                width="48px"
                height="48px"
                elevation="0"
                class="my-2"
                color="#F5F5F5"
                style="border-radius: 4px 0px 0px 4px;"
                @click="clickAlignLeft">
                <v-icon size="23">
                    format_align_left
                </v-icon>
            </v-btn>

            <!-- 버튼(중앙) 정렬) -->
            <v-btn
                tile
                small
                width="48px"
                height="48px"
                elevation="0"
                class="my-2"
                color="#F5F5F5"
                @click="clickAlignCenter">
                <v-icon size="23">
                    format_align_center
                </v-icon>
            </v-btn>

            <!-- 버튼(우측) 정렬) -->
            <v-btn
                small
                width="48px"
                height="48px"
                elevation="0"
                class="my-2"
                color="#F5F5F5"
                style="border-radius: 0px 4px 4px 0px;"
                @click="clickAlignRight">
                <v-icon size="23">
                    format_align_right
                </v-icon>
            </v-btn>
        </div>
        <div 
            class="Body"
            :style="{'padding': padding}">
            <div
                ref="editor"
                class="Editor"
                contenteditable="true"
                placeholder="내용을 입력해주세요."
                @paste="pasteEditorOnlyText"
                v-html="value">
            </div>
        </div>
        <div class="Foot pa-2">
            <v-icon
                color="#E2E2E2"
                style="margin-bottom: 1px"
                size="14">mdi-copyright
            </v-icon>
            Hanteam.
        </div>
    </div>
</template>

<script>
    import AWSConfig from '~/constants/aws-config.js';
    import ActionType from '~/constants/action-type.js';

    export default {
        mixins: [global],

        props: {
            isToolbar: {
                type: Boolean,
                default: true
            },

            padding: {
                type: String,
                default: '0px'
            },

            value: {
                type: String,
                default: ''
            }
        },

        data() {
            return {
                colorTextBold: '#F5F5F5'
            }
        },

        mounted() {
            document.addEventListener('selectionchange', this.onSelectionhange);
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

            clickTextBold() {
                const selection = document.getSelection();
                const type = selection.type;
                if(type === "Range") {
                    document.execCommand('bold', false, null);
                }
            },

            clickAlignLeft() {
                document.execCommand('justifyLeft', false, null);
            },

            clickAlignCenter() {
                document.execCommand('justifyCenter', false, null);
            },

            clickAlignRight() {
                document.execCommand('justifyRight', false, null);
            },

            onSelectionhange() {
                const selection = document.getSelection();
                const type = selection.type;
                if(type === "Range") {
                    const range = selection.getRangeAt(0);
                    const parentStart = range.startContainer.parentElement.localName;
                    const parentEnd = range.endContainer.parentElement.localName;
                    if(parentStart === "b" || parentEnd === "b") {
                        this.colorTextBold = '#7666D1';
                    } else {
                        this.colorTextBold = '#F5F5F5';
                    }
                } else {
                    this.colorTextBold = '#F5F5F5';
                }
            },

            clickImageLoad() {
                this.$refs.editor.focus();
                this.$refs.image.click();
            },

            changeImage(event) {
                const file = event.target.files[0];
                if(file) {
                    if(this.validationFileSizeCheck(file)) {
                        const filename = file.name;
                        var reader = new FileReader();
                        reader.onload = function (event) {
                            const tag = `<img src="${event.target.result}" data-filename="${filename}" style="max-width: 95%; padding: 10px 10px 0 10px;"/>`;
                            document.execCommand('insertHTML', false, tag);
                        }.bind(this);
                        reader.readAsDataURL(file);
                    } else {
                        this.openDialogAlert('이미지는 5MB 이하 사이즈만 첨부가 가능합니다.');
                    }
                }
                this.$refs.image.select();
                this.$refs.image.value = "";
            },

            // 부모에서 자식함수 호출
            clickButtonCareerBoardSave(callback) {
                const editor = this.$refs.editor;
                editor.setAttribute("contenteditable", false);
                const images = editor.getElementsByTagName('img');

                if(images.length > 1) {
                    this.openDialogAlert('이미지는 게시글당 최대 1개까지 등록이 가능합니다.');
                    const cleanHtml = false;
                    this.initEditor(cleanHtml);
                    return false;
                }
                
                const awsS3FileUploadPromiseArray = this.getUploadBase64ImageProccess(editor, images);
                Promise.all(awsS3FileUploadPromiseArray).then(async (values) => {
                    const html = editor.innerHTML;
                    if(typeof callback === "function") await callback(html);
                    const cleanHtml = true;
                    this.initEditor(cleanHtml);
                }).catch((error) => {
                    const cleanHtml = false;
                    this.initEditor(cleanHtml);
                });
            },

            initEditor(cleanHtml) {
                const editor = this.$refs.editor;
                if(editor) {
                    if(cleanHtml) editor.innerHTML = "";
                    editor.setAttribute("contenteditable", true);
                }
                this.$emit('changeOverlayShow', false);
            },

            getUploadBase64ImageProccess(editor, images) {
                const awsS3FileUploadPromiseArray = [];

                images.forEach((image, index) => {
                    if(this.isDataURL(image.src)) {
                        const temp = new Promise((resolve, reject) => {
                            const filename = image.getAttribute("data-filename");
                            const base64 = image.src;
                            const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
                            const type = base64.split(';')[0].split('/')[1];
                            const callback = function(path) {
                                if(path) {
                                    image.src = path;
                                    resolve(image.src);
                                }
                            }.bind(this);
                            this.upload(base64Data, filename, type, callback, 'CAREER');
                        });
                        awsS3FileUploadPromiseArray.push(temp);
                    }
                });

                return awsS3FileUploadPromiseArray;
            },

            isDataURL(str) {
                const regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
                return !!str.match(regex);
            },

            pasteEditorOnlyText(e) {
                let paste = (e.clipboardData || window.clipboardData).getData('text');
                // 선택된 객체 조회
                const selection = window.getSelection();
                if (!selection.rangeCount) return false;
                selection.deleteFromDocument();
                selection.getRangeAt(0).insertNode(document.createTextNode(paste));
                e.preventDefault();
            }
        },

        beforeDestroy() {
            const cleanHtml = true;
            this.initEditor(cleanHtml);
            document.removeEventListener('selectionchange', this.onSelectionhange);
        }
    }
</script>

<style scoped>
    [contenteditable=true]:empty::before {
        content:attr(placeholder);
        color: rgb(175, 175, 175);
        font-weight: 100;
    }

    .Hide {
        display: none;
    }

    .TextEditor {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .TextEditor .Head {
        flex: 0 0 65px;
        display: flex;
        flex-wrap: wrap;
        border-bottom: 1px solid #EFECFF;
        overflow: hidden;
    }

    .TextEditor .Body {
        flex: 1;
        /* padding: 20px 0; */
    }

    .TextEditor .Body .Editor {
        height: 100%;
        outline: none;
        color: rgba(0, 0, 0, 0.87);
        line-height: 25px;
        /* padding: 12px; */
    }

    .TextEditor .Foot {
        flex: 0 0 25px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 11px;
        font-weight: bold;
        cursor: default;
        color: #E2E2E2;
    }
</style>