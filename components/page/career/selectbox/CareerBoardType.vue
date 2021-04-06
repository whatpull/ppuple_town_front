<template>
    <v-select
        class="CareerBoardType"
        :class="{'Filter': type === 'FILTER'}"
        :items="selectboxTypes"
        append-icon="arrow_drop_down"
        item-text="text"
        item-value="ctSeq"
        item-color=""
        :value="selected"
        :disabled="isDisabled"
        color="#7666D1"
        solo
        dense
        @change="changeCareerBoardType">
    </v-select>
</template>

<script>
    import ActionType from '~/constants/action-type.js';
    import { mapGetters } from "vuex";

    export default {
        props: {
            type: { // FILTER, EDITOR
                type: String,
                default: 'FILTER'
            },

            isDisabled: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            ...mapGetters({
                filter: 'career/board/type/filter',
                editor: 'career/board/type/editor',
                types: 'career/board/type/types'
            }),

            selected() {
                switch(this.type) {
                    case 'EDITOR':
                        return this.editor;
                    default: // FILTER
                        return this.filter;
                }
            },

            selectboxTypes() {
                return this.types.filter(type => type.type !== "ALL");
            }
        },

        methods: {
            changeCareerBoardType(value) {
                switch(this.type) {
                    case 'EDITOR':
                        this.$store.dispatch(`career/board/type/${ActionType.CHANGE_BOARD_TYPE_EDITOR}`, value);
                        break;
                    default: // FILTER
                        this.$store.dispatch(`career/board/type/${ActionType.CHANGE_BOARD_TYPE_FILTER}`, value);
                        break;
                }
            },
        },

        beforeDestroy() {
            if(this.type === 'EDITOR') this.changeCareerBoardType(null);
        }
    }
</script>

<style scoped>
    .CareerBoardType /deep/ .v-text-field__details {
        display: none;
    }

    .CareerBoardType /deep/ .v-select__selection {
        font-size: 15px;
    }

    .CareerBoardType.Filter /deep/ .v-select__selection {
        font-size: 13px;
        font-weight: bold;
        color: #7666D1;
    }

    .CareerBoardType /deep/ .v-input__slot {
        box-shadow: none !important;
        margin-bottom: 0px;
    }
</style>