<template>
    <v-select
        class="CareerBoardCategory"
        :class="{'Filter': type === 'FILTER'}"
        :items="categories"
        append-icon="arrow_drop_down"
        item-text="text"
        item-value="ccSeq"
        item-color=""
        :value="selected"
        :disabled="isDisabled"
        color="#7666D1"
        solo
        dense
        @change="changeCareerBoardCategory">
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
                filter: 'career/board/category/filter',
                editor: 'career/board/category/editor',
                categories: 'career/board/category/categories'
            }),

            selected() {
                switch(this.type) {
                    case 'EDITOR':
                        return this.editor;
                    default: // FILTER
                        return this.filter;
                }
            }
        },

        methods: {
            changeCareerBoardCategory(value) {
                switch(this.type) {
                    case 'EDITOR':
                        this.$store.dispatch(`career/board/category/${ActionType.CHANGE_BOARD_CATEGORY_EDITOR}`, value);
                        break;
                    default: // FILTER
                        this.$store.dispatch(`career/board/category/${ActionType.CHANGE_BOARD_CATEGORY_FILTER}`, value);
                        break;
                }
            }
        },

        beforeDestroy() {
            if(this.type === 'EDITOR') this.changeCareerBoardCategory(null);
        }
    }
</script>

<style scoped>
    .CareerBoardCategory /deep/ .v-text-field__details {
        display: none;
    }

    .CareerBoardCategory /deep/ .v-select__selection {
        font-size: 15px;
    }

    .CareerBoardCategory.Filter /deep/ .v-select__selection {
        font-size: 13px;
        font-weight: bold;
        color: #7666D1;
    }

    .CareerBoardCategory /deep/ .v-input__slot {
        box-shadow: none !important;
        margin-bottom: 0px;
    }
</style>