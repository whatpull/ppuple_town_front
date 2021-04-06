<template>
    <v-tabs
        :value="tab.toString()"
        class="CareerTab"
        slider-color="#7666D1"
        centered>
        <v-tab
            v-for="type in types"
            :key="type.ctSeq"
            active-class="text-common"
            :href="'#'+type.ctSeq"
            @click="clickTabItem(type.ctSeq)">
            <div 
                style="width: 100%"
                class="d-flex flex-column">
                <div 
                    v-show="tabExtende"
                    class="mb-2">
                    <v-img 
                        :src="type.icon"
                        max-height="50px"
                        contain
                        aspect-ratio="1" />
                </div>
                <div class="font-weight-bold">
                    {{type.text}}
                </div>
            </div>
        </v-tab>
    </v-tabs>
</template>

<script>
    import ActionType from '~/constants/action-type.js';
    import { mapGetters } from "vuex";

    export default {
        props: {
            tabExtende: {
                type: Boolean,
                default: true
            },
        },

        data() {
            return {
                selectedTab: "3"
            }
        },

        computed: {
            ...mapGetters({
                types: 'career/board/type/types',
                tab: 'career/board/type/tab'
            })
        },

        methods: {
            clickTabItem(index) {
                window.scrollTo(0, 0);
                this.$store.dispatch(`career/board/type/${ActionType.CHANGE_BOARD_TYPE_TAB}`, index);
                this.changeTabData();
            },

            changeTabData() {
                this.$store.dispatch(`career/board/list/${ActionType.GET_BOARD_LIST}`);
            }
        }
    }
</script>

<style scoped>
    .CareerTab /deep/ .v-slide-group__next, 
    .CareerTab /deep/ .v-slide-group__prev {
        display: none !important;
    }
</style>