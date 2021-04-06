<template>
    <div
        v-if="shortcuts" 
        class="Portfolio">
        <div class="Head">
            <name-filed
                :detailData="detailData"
                :isNonSignin="isNonSignin" />
        </div>
        <div class="Body">
            <div class="PortfolioInfo text-common px-3">
                <div 
                    class="mr-2"
                    style="flex: 0 0 25px; max-width: 25px;">
                    <v-icon color="#7666D1">widgets</v-icon>
                </div>
                <div 
                    class="mt-1"
                    style="flex: 0 0 30px; max-width: 30px;">{{ totalCount }}</div>
                <div class="flex-grow-1"></div>
                <div 
                    v-show="isNonSignin"
                    class="MemberInfo">
                    <card-member 
                        type="sm"
                        :avatar="detailData.user.avatar"
                        :account="detailData.user.account"
                        :name="detailData.user.name"/>
                </div>
            </div>
            <div class="PortfolioList pt-2">
                <portfolio-list :isNonSignin="isNonSignin" />
            </div>
        </div>
    </div>
</template>

<script>
    import ActionType from '~/constants/action-type.js';
    import { mapGetters } from "vuex";

    import NameFiled from '~/components/page/portfolio/NameFiled.vue';
    import PortfolioList from '~/components/page/portfolio/list/PortfolioList.vue';
    import CardMember from '~/components/common/card/CardMember.vue';

    export default {
        validate({ params }) {
            // 인코딩 패턴 규칙
            // private static final char[] toBase64URL = {
            //     'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            //     'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            //     'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
            //     'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            //     '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '_'
            // };
            return /^[0-9a-zA-Z_\-=]{12}$/.test(params.shortcuts);
        },

        components: {
            NameFiled,
            PortfolioList
        },

        data() {
            return {
                ticking: false,
                last_known_scroll_position: 0,
                test: false
            }
        },

        async asyncData({ store, route }) {
            const shortcuts = route.params.shortcuts;
            await store.dispatch(`portfolio/detail/${ActionType.GET_PORTFOLIO_DETAIL_ASYNC}`, shortcuts);
        },

        computed: {
            ...mapGetters({
                user: 'user/detail/info',
                detailData: 'portfolio/detail/detailData',
                portfolioPage: 'portfolio/list/portfolioPage'
            }),

            shortcuts() {
                return this.$route.params.shortcuts;
            },

            isNonSignin() {
                // 비로그인 OR 로그인 했으나 자신의 포트폴리오가 아닌경우
                return this.user === null || (this.user && (this.user.shortcuts !== this.shortcuts));
            },

            totalCount() {
                return this.portfolioPage.totalElements > 99 ? '99+' : this.portfolioPage.totalElements;
            }
        },

        mounted() {
            this.$nextTick(function() {
                window.addEventListener('scroll', this.scrollEvent);
            });
        },

        methods: {
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
                const pmSeq = this.detailData.pmSeq;
                const payload = {
                    pmSeq: pmSeq,
                    type: "MORE",
                    callback: () => {
                        window.addEventListener('scroll', this.scrollEvent);
                    }
                }
                this.$store.dispatch(`portfolio/list/${ActionType.GET_PORTFOLIO_LIST}`, payload);
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
    .Portfolio {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .Portfolio .Head {
        width: 100%;
        flex: 0 0 58px;
    }

    .Portfolio .Body {
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 10px;
    }

    .Portfolio .Body .PortfolioInfo {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
</style>