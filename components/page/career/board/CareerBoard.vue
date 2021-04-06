<template>
    <v-tabs-items
        touchless
        class="CareerBoardItems"
        :value="tab">
        <v-tab-item
            class="CareerBoardItem pa-5"
            v-for="type in types"
            :key="type.ctSeq"
            :value="type.ctSeq">
            <v-card
                class="rounded-lg"
                min-width="100%"
                min-height="100%"
                style="overflow: hidden;"
                elevation="1">
                <career-board-header />
                <career-board-list
                    :list="list(type.type)" />
            </v-card>
        </v-tab-item>
    </v-tabs-items>
</template>

<script>
    import ActionType from '~/constants/action-type.js';
    import { mapGetters } from "vuex";

    import CareerBoardHeader from '~/components/page/career/board/CareerBoardHeader.vue';
    import CareerBoardList from '~/components/page/career/board/CareerBoardList.vue';

    export default {
        components: {
            CareerBoardHeader,
            CareerBoardList
        },

        data() {
            return {
                ticking: false,
                last_known_scroll_position: 0
            }
        },

        computed: {
            ...mapGetters({
                tab: 'career/board/type/tab',
                types: 'career/board/type/types',
                loading: 'career/board/list/loading',
                listTypeAll: 'career/board/list/listTypeAll',
                listTypeQuestion: 'career/board/list/listTypeQuestion',
                listTypeShare: 'career/board/list/listTypeShare',
                listTypeFree: 'career/board/list/listTypeFree'
            })
        },

        mounted() {
            this.$nextTick(function() {
                window.addEventListener('scroll', this.scrollEvent);
                this.$store.commit(`career/board/list/${ActionType.CHANGE_BOARD_LIST_LOADING}`, false);
            });
        },

        methods: {
            list(type) {
                let data = [];
                switch(type) {
                    case 'ALL': // 전체
                        data = this.listTypeAll;
                        break;
                    case 'QUESTION': // 질문하기
                        data = this.listTypeQuestion;
                        break;
                    case 'SHARE': // 정보공유
                        data = this.listTypeShare;
                        break;
                    case 'FREE': // 멤버모집(자유)
                        data = this.listTypeFree;
                        break;
                    default:
                        data = this.listTypeAll;
                        break;
                }
                return data;
            },

            scrollEvent(event) { // 스크롤 이벤트 구현
                this.last_known_scroll_position = window.scrollY;
                if (this.ticking === false) {
                    window.requestAnimationFrame(function() {
                        this.reachingBottom(this.last_known_scroll_position);
                        this.ticking = false;
                    }.bind(this));
                    this.ticking = true;
                }
            },

            reachingBottom(scrollPosition) {
                const windowHeight = window.visualViewport.height;
                const documentHeight = document.body.offsetHeight;
                if(scrollPosition + windowHeight >= documentHeight - 200) {
                    window.removeEventListener('scroll', this.scrollEvent);
                    this.loadCareerBoardListNextPage();
                }
            },

            loadCareerBoardListNextPage() {
                const payload = {
                    type: "MORE",
                    callback: () => {
                        window.addEventListener('scroll', this.scrollEvent);
                    }
                }
                this.$store.dispatch(`career/board/list/${ActionType.GET_BOARD_LIST}`, payload);
            }
        },

        beforeDestroy() {
            window.removeEventListener('scroll', this.scrollEvent);
            this.ticking = false;
            this.last_known_scroll_position = 0;
        }
    }
</script>

<style scoped>
    .CareerBoardItems {
        height: 100%;
    }

    .CareerBoardItem {
        height: 100%;
        position: relative;
    }

    .CareerBoardItem .Progress {
        position: absolute;
        top: calc(50% - 25px);
        left: calc(50% - 25px);
    }
</style>