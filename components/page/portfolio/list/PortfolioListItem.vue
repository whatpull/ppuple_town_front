<template>
    <v-hover v-slot="{ hover }">
        <v-card 
            class="ma-1 rounded-lg"
            elevation="3">
            <v-responsive
                aspect-ratio="1"
                class="d-flex justify-center align-center text-center">
                <v-img
                    aspect-ratio="1"
                    :src="portfolio.image">
                    <v-expand-transition mod="in-out">
                        <div
                            v-if="hover"
                            class="d-flex justify-center align-center white--text headline"
                            style="height: 100%; background: rgba(0, 0, 0, 0.2); cursor: default; position:relative;">
                            <div v-if="isNonSignin">
                                {{ comment }}
                            </div>
                            <form 
                                v-else
                                @submit.prevent="() => { return; }"
                                autocomplete="off"
                                class="CommentWrapper">
                                <v-text-field
                                    v-model="comment"
                                    class="Comment"
                                    color="#FFFFFF"
                                    label="COMMENT"
                                    counter="15"
                                    append-icon="cancel"
                                    outlined
                                    @blur="blurUpdateComment"
                                    @keyup="keyupEnterUpdateComment"
                                    @click:append="clickRemoveComment">
                                </v-text-field>
                                <div class="Button">
                                    <v-btn
                                        class="mx-2"
                                        fab
                                        dark
                                        small
                                        color="#594da1"
                                        @click="clickRemovePortfolio">
                                        <v-icon dark>
                                            remove
                                        </v-icon>
                                    </v-btn>
                                </div>
                            </form>
                        </div>
                    </v-expand-transition>    
                </v-img>
            </v-responsive>
        </v-card>
    </v-hover>
</template>

<script>
    import ActionType from '~/constants/action-type.js';

    export default {
        props: {
            portfolio: {
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
                comment: this.portfolio ? this.portfolio.comment : ''
            }
        },

        methods: {
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

            clickRemoveComment(event) {
                event.preventDefault();
                this.remove();
            },

            clickRemovePortfolio() {
                const payload = {
                    show: true,
                    message: '대상을 정말<br>삭제하시겠습니까?',
                    btnYesFunc: async() => {
                        const pseq = this.portfolio.pseq;
                        const payload = {
                            pseq: pseq
                        }
                        await this.$store.dispatch(`portfolio/submit/${ActionType.REMOVE_PORTFOLIO_ASYNC}`, payload);
                    },
                    btnNoFunc: () => {
                        console.log("NO");
                    }
                }
                this.$store.dispatch(`dialog/confirm/${ActionType.CHANGE_DIALOG_CONFIRM}`, payload);
            },

            async update() {
                const comment = this.comment;
                if(comment ) {
                    if(comment.length <= 15) {
                        const payload = JSON.parse(JSON.stringify(this.portfolio));
                        payload.comment = comment;
                        await this.$store.dispatch(`portfolio/submit/${ActionType.PUT_PORTFOLIO_ASYNC}`, payload);
                    } else {
                        this.comment = comment.substring(0, 15);
                    }
                }
            },

            remove() {
                const comment = this.comment;
                if(comment.length > 0) {
                    this.comment = '';
                    const payload = JSON.parse(JSON.stringify(this.portfolio));
                    payload.comment = '';
                    this.$store.dispatch(`portfolio/submit/${ActionType.PUT_PORTFOLIO_ASYNC}`, payload);
                }
            }
        }
    }
</script>

<style scoped>
    .CommentWrapper {
        max-width: 200px;
    }

    .CommentWrapper .Button {
        position: absolute;
        bottom: 8px;
        right: 0;
    }

    .CommentWrapper .Comment /deep/ fieldset {
        border-color: #FFFFFF;
        color: #FFFFFF;
    }

    .CommentWrapper .Comment /deep/ label {
        color: #FFFFFF;
    }

    .CommentWrapper .Comment /deep/ input {
        color: #FFFFFF;
    }

    .CommentWrapper .Comment /deep/ .v-counter {
        color: #FFFFFF;
    }

    .CommentWrapper .Comment /deep/ .v-icon.v-icon {
        color: #FFFFFF;
    }
</style>