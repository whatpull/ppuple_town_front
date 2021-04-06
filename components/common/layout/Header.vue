<template>
    <v-container 
        fluid 
        ma-auto 
        pa-0
        class="Header Shadow">
        <v-card
            elevation="0"
            tile>
            <v-toolbar
                class="HeaderToolbar"
                color="white"
                light
                flat
                height="64px"
                extended
                :extension-height="tabExtensionHeight">

                <!-- 버튼(홈) -->
                <v-btn
                    v-show="showHome"
                    width="45px"
                    height="35px"
                    tile
                    small
                    color="#FFFFFF"
                    elevation="0"
                    class="HomeButton"
                    @click="clickButtonHome">
                    <!-- <v-icon
                        size="30px"
                        color="#7666D1">
                        home
                    </v-icon> -->
                    <img 
                        class="IconLogo"
                        src="~assets/image/icon/icon_logo.png" />
                </v-btn>

                <!-- 버튼(뒤로가기) -->
                <v-btn
                    v-show="showBack"
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

                <!-- 제목 -->
                <v-slide-y-transition
                    hide-on-leave
                    origin="center">
                    <v-sheet
                        class="flex-grow-1 text-center"
                        :class="{'CenterMargin': showHome}"
                        v-show="!showSearchAutocomplete">
                        <v-toolbar-title 
                            class="text-common font-weight-bold text-h6"
                            v-show="headerTitle">
                            {{headerTitle}}
                        </v-toolbar-title>
                    </v-sheet>
                </v-slide-y-transition>

                <!-- 검색(자동완성) -->
                <v-slide-y-transition
                    hide-on-leave
                    origin="center">
                    <v-sheet 
                        class="flex-grow-1"
                        v-show="showSearchAutocomplete">
                            <form
                                @submit.prevent="() => { return; }"
                                autocomplete="off">
                                <v-autocomplete
                                    v-show="showSearchAutocomplete"
                                    v-model="select"
                                    :items="searchAutoComplete"
                                    item-text="title"
                                    item-value="cseq"
                                    :search-input.sync="search"
                                    append-icon=""
                                    background-color="white"
                                    color="#7666D1"
                                    dense
                                    outlined
                                    rounded
                                    clear-icon="cancel"
                                    clearable
                                    class="HeaderSearchAutocomplete mx-4"
                                    flat
                                    hide-no-data
                                    hide-details
                                    placeholder="검색해 보세요!">
                                </v-autocomplete>
                            </form>
                    </v-sheet>
                </v-slide-y-transition>

                <!-- 버튼(검색) -->
                <v-btn
                    v-show="showSearch"
                    width="35px"
                    height="35px"
                    fab
                    color="#FFFFFF"
                    elevation="0"
                    @click="clickButtonSearch">
                    <v-icon
                        size="30px"
                        color="#7666D1">
                        {{showSearchAutocomplete ? 'search_off' : 'search'}}
                    </v-icon>
                </v-btn>

                <!-- 버튼(공유) -->
                <v-btn 
                    v-show="showShare"
                    width="35px"
                    height="35px"
                    fab
                    color="#594DA1"
                    elevation="2"
                    @click="clickButtonShare">
                    <v-icon
                        size="25px"
                        color="#FFFFFF"
                        class="mr-1">
                        share
                    </v-icon>
                </v-btn>

                <!-- 빈칸(우측) -->
                <div
                    v-show="showEmptyRight"
                    class="ToolbarEmpty">
                </div>

                <!-- 탭 -->
                <template 
                    v-slot:extension>
                    <v-slide-y-transition
                        hide-on-leave
                        origin="center">
                        <header-tab
                            v-show="showTab"
                            :tabExtende="tabExtende"/>
                    </v-slide-y-transition>
                </template>
            </v-toolbar>
        </v-card>
        <v-snackbar
            class="SnackBar"
            v-model="snackbarIsOpen">
            {{ snackbarText }}

            <template v-slot:action="{ attrs }">
                <v-btn
                    color="#FFFFFF"
                    text
                    v-bind="attrs"
                    icon
                    @click="snackbarIsOpen = false">
                    <v-icon color="#FFFFFF">close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>

<script>
    import ActionType from '~/constants/action-type.js';
    import { mapGetters } from "vuex";

    import HeaderTab from '~/components/common/layout/HeaderTab.vue';

    export default {
        data() {
            return {
                showHome: false,
                showBack: false,
                showSearchAutocomplete: false,
                showSearch: false,
                showShare: false,
                showEmptyRight: false,
                showTab: false,
                tabExtende: true,
                search: null,
                select: null,
                snackbarText: '',
                snackbarIsOpen: false
            }
        },

        computed: {
            ...mapGetters({
                user: 'user/detail/info',
                searchAutoComplete: 'career/board/search/searchAutoComplete'
            }),

            isNonSignin() {
                return this.user === null;
            },
            
            headerTitle() {
                return this.getPathOfTitle(this.routePath);
            },

            tabExtensionHeight() {
                let height = "0px";
                if(this.showTab) {
                    if(this.tabExtende) {
                        height = "100px";
                    } else {
                        height = "48px";
                    }
                } else {
                    height = "0px";
                }
                return height;
            },

            routePath() {
                return this.$route.path;
            }
        },

        head() {
            return {
                title: this.headerTitle,
            }
        },

        mounted() {
            this.initToolBarSetting(this.routePath);
        },

        methods: {
            getPathOfTitle(path) {
                let title = "";
                if(/^(\/portfolio\/)([0-9a-zA-Z_\-=]{12})$/.test(path)) {
                    title = "포트폴리오";
                } else if(path.indexOf("career") > -1) {
                    title = "진로카페";
                } else if(path.indexOf("home") > -1) {
                    title = "홈스윗홈"
                } else { // 에러페이지(공통)
                    title = "We're sorry";
                }
                return title;
            },

            initToolBarSetting(path) {
                // 공통
                this.showSearchAutocomplete = false;

                if(/^(\/portfolio\/)([0-9a-zA-Z_\-=]{12})$/.test(path)) {
                    this.showHome = true;
                    this.showBack = false;
                    this.showSearch = false;
                    this.showShare = this.isNonSignin ? false : true;
                    this.showEmptyRight = this.isNonSignin ? true : false;
                    this.showTab = false;
                } else if(path === "/career") {
                    this.showHome = true;
                    this.showBack = false;
                    this.showSearch = true;
                    this.showShare = false;
                    this.showEmptyRight = false;
                    this.showTab = true;
                } else if(/^\/career\/[0-9]*$/.test(path)) {
                    this.showHome = false;
                    this.showBack = true;
                    this.showSearch = false;
                    this.showShare = false;
                    this.showEmptyRight = true;
                    this.showTab = false;
                } else { // 에러페이지(공통)
                    this.showHome = true;
                    this.showBack = false;
                    this.showSearch = false;
                    this.showShare = false;
                    this.showEmptyRight = true;
                    this.showTab = false;
                }
            },

            initCareerFilterAndTab() {
                this.$store.commit(`career/board/type/${ActionType.CHANGE_BOARD_TYPE_TAB}`, null);
                this.$store.commit(`career/board/type/${ActionType.CHANGE_BOARD_TYPE_FILTER}`, null);
                this.$store.commit(`career/board/category/${ActionType.CHANGE_BOARD_CATEGORY_FILTER}`, null);
            },

            clickButtonHome() {
                this.$router.push('/');
                if(this.$route.path === '/career') this.initCareerFilterAndTab();
            },

            clickButtonBack() {
                this.$router.go(-1);
            },

            clickButtonSearch() {
                this.showSearchAutocomplete = !this.showSearchAutocomplete;
                this.select = null;
            },

            clickButtonShare() {
                this.snackbarText = "공유 URL이 복사되었습니다."
                this.snackbarIsOpen = true;
                let url = window.location.href;
                this.urlCopy(url);
            },

            urlCopy(url) {
                this.snackbarIsOpen = true;
                const origin = window.document.location.origin;
                const tempElem = document.createElement('textarea');
                tempElem.value = url;
                document.body.appendChild(tempElem);

                tempElem.select();
                document.execCommand("copy");
                document.body.removeChild(tempElem);
            },

            // 검색관련
            querySelections (value) { // Simulated ajax query
                if(value) {
                    // 특수문자 제거
                    this.$store.dispatch(`career/board/search/${ActionType.GET_SEARCH_BOARD_AUTO_COMLETE_LIST}`, this.specialCharactersDelete(value));
                } else {
                    this.$store.commit(`career/board/search/${ActionType.INIT_SEARCH_BOARD_AUTO_COMLETE_LIST}`);
                }
            },
            
            specialCharactersDelete(str) {
                var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
                if(reg.test(str)) {
                    return str.replace(reg, "");    
                } else {
                    return str;
                }
            }
        },

        watch: {
            search(value) {
                this.querySelections(value)
            },

            select(value) {
                if(value) this.$router.push(`career/${value}`);
            },

            routePath(value) {
                this.getPathOfTitle(this.routePath);
                this.initToolBarSetting(this.routePath);
            }
        }
    }
</script>

<style scoped>
    .Header {
        position: sticky;
        top: 0px;
        z-index: 99;
        overflow: hidden;
    }

    .Header .CenterMargin {
        margin-right: 20px;
    }

    .Header .HomeButton /deep/ .v-btn:before {
        background-color: transparent;
    }

    .Header .HomeButton /deep/ .v-btn:active {
        background-color: transparent;
    }

    .Header .IconLogo {
        width: 45px;
    }

    .Header .HeaderToolbar {
        -webkit-transition: height 0.3s ease-out;
        transition: height 0.3s ease-out;
    }

    .HeaderSearchAutocomplete /deep/ fieldset {
        border-color: #7666D1;
    }

    .Header .ToolbarEmpty {
        width: 35px;
        height: 35px;
    }

    @media (max-width: 576px) {
        .Header .CenterMargin {
            margin-right: 15px;
        }

        .Header .HeaderToolbar {
            -webkit-transition: height 0.01s ease-out;
            transition: height 0.01s ease-out;
        }
    }
</style>