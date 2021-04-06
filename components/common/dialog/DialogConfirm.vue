<template>
    <v-dialog
        content-class="DialogConfirmWrapper"
        :transition="false"
        :value="show"
        width="320"
        @click:outside="clickClose">
        <v-card 
            min-height="170"
            class="DialogConfirm d-flex flex-column">
            <v-card-text
                class="Content flex-grow-1 d-flex flex-row pa-0">
                <div class="Icon">
                    <v-img
                        class="flex-grow-0"
                        width="40px" 
                        src="/image/icon/dialog.svg"/>
                </div>
                <div 
                    class="Message" 
                    v-html="message">
                </div>
            </v-card-text>
            <v-card-actions
                class="Button-Border pa-2">
                <v-spacer></v-spacer>
                <v-btn
                    class="Button"
                    width="100"
                    height="45"
                    color="#7666D1"
                    text
                    dark
                    @click="clickCancelButton">
                    {{ btnNoText }}
                </v-btn>
                <v-btn
                    class="Button font-weight-bold"
                    width="100"
                    height="45"
                    color="#7666D1"
                    text
                    dark
                    @click="clickConfimButton">
                    {{ btnYesText }}
                </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import ActionType from '~/constants/action-type.js';
    import { mapGetters } from "vuex";

    export default {
        computed: {
            ...mapGetters({
                show: 'dialog/confirm/show',
                icon: 'dialog/confirm/icon',
                message: 'dialog/confirm/message',
                btnYesText: 'dialog/confirm/btnYesText',
                btnYesFunc: 'dialog/confirm/btnYesFunc',
                btnNoText: 'dialog/confirm/btnNoText',
                btnNoFunc: 'dialog/confirm/btnNoFunc'
            })
        },

        methods: {
            clickConfimButton() {
                if(typeof this.btnYesFunc === "function") this.btnYesFunc();
                this.clickClose();
            },

            clickCancelButton() {
                if(typeof this.btnNoFunc === "function") this.btnNoFunc();
                this.clickClose();
            },

            clickClose() {
                this.$store.dispatch(`dialog/confirm/${ActionType.INIT_DIALOG_CONFIRM}`);
            }
        }
    }
</script>

<style>
    .DialogConfirmWrapper {
        border-radius: 16px !important;
    }
</style>
<style scoped>
    .DialogConfirm {
        border-radius: 16px;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .DialogConfirm .Content {
        width: 200px;
    }

    .DialogConfirm .Content .Icon {
        flex: 0 0 50px;
        display: flex;
        align-items: center;
    }

    .DialogConfirm .Content .Message {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 0px 10px;
        font-size: 16px;
        font-weight: bold;
    }

    .DialogConfirm .Button-Border {
        border-top: 1px solid #CBCBCB;
    }

    .DialogConfirm .Button {
        font-size: 16px;
    }
</style>