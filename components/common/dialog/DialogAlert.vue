<template>
    <v-dialog
        content-class="DialogAlertWrapper"
        :transition="false"
        :value="show"
        width="320"
        @click:outside="clickClose">
        <v-card 
            min-height="170"
            class="DialogAlert d-flex flex-column">
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
                class="pa-5 pt-0">
                <v-spacer></v-spacer>
                <v-btn
                    class="Button font-weight-bold"
                    width="200"
                    height="45"
                    rounded
                    color="#7666D1"
                    dark
                    @click="clickConfimButton">
                    {{ btnText }}
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
                show: 'dialog/alert/show',
                icon: 'dialog/alert/icon',
                message: 'dialog/alert/message',
                btnText: 'dialog/alert/btnText',
                btnFunc: 'dialog/alert/btnFunc'
            })
        },

        methods: {
            clickConfimButton() {
                if(typeof this.btnFunc === "function") this.btnFunc();
                this.clickClose();
            },

            clickClose() {
                this.$store.dispatch(`dialog/alert/${ActionType.INIT_DIALOG_ALERT}`);
            }
        }
    }
</script>

<style>
    .DialogAlertWrapper {
        border-radius: 16px !important;
    }
</style>
<style scoped>
    .DialogAlert {
        border-radius: 16px;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .DialogAlert .Content {
        width: 200px;
    }

    .DialogAlert .Content .Icon {
        flex: 0 0 50px;
        display: flex;
        align-items: center;
    }

    .DialogAlert .Content .Message {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 0px 10px;
        font-size: 16px;
        font-weight: bold;
    }

    .DialogAlert .Button {
        font-size: 18px;
    }
</style>