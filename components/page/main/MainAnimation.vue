<template>
    <div class="main-wrapper" @click.stop="clickCommentOtherArea">
        <div class="swagger main-logo">
            <img v-show="isLoad" src="~assets/image/icon/logo.png" />
        </div>
        <div class="background" ref="background">
            <div class="island" ref="island">
                <div class="test-lab" ref="test" v-on:click="next('test')"></div>
                <div class="career-cafe" ref="career"></div>
                <div class="career-cafe-click" v-on:click="next('career')"></div>
                <div class="fountain" ref="fountain"></div>
                <div class="character-lufy" ref="lufy"></div>
                <div class="character-lyn" ref="lyn"></div>
                <div class="portfolio" ref="construction"></div>
                <div class="portfolio clickarea" v-on:click="next('portfolio')"></div>
                <div class="home-sweethome" ref="home" v-on:click="next('home')"></div>
                <div class="character-comment-lufy01" ref="lufy01comment" @click.stop="clickComment('lufy')"></div>
                <div class="character-comment-lyn01" ref="lyn01comment" @click.stop="clickComment('lyn')"></div>
                <div class="character-comment-boby01" ref="boby01comment" @click.stop="clickComment('boby')" v-show="false"></div>
                <div class="character-comment-mona01" ref="mona01comment" @click.stop="clickComment('mona')"></div>
                <div class="island-fairytale" ref="fairytale" v-on:click="next('fairytale')"></div>
                <div class="island-forest" ref="forest"></div>
                <div class="signin" ref="signin" v-on:click="next('signin')"></div>
            </div>
            <dialog-character-talk :character="character" />
        </div>
        <main-process :isLoad="isLoad"/>
    </div>
</template>

<script>
    import ActionType from '~/constants/action-type.js';
    import { mapGetters } from "vuex";

    // 컴포넌트
    import MainProcess from '~/components/page/main/MainProcess.vue';
    import DialogCharacterTalk from '~/components/page/main/DialogCharacterTalk.vue';

    export default {
        components: {
            MainProcess,
            DialogCharacterTalk
        },

        data() {
            return {
                isLoad: false,
                character: undefined
            }
        },

        computed: {
            ...mapGetters({
                user: 'user/detail/info'
            })
        },

        methods: {
            image() {
                const arr_promise = [];
                // 배경
                const background_image = require(`@/assets/animation/bg-landscape.png`);
                const background = this.$refs.background;
                const background_promise = this.image_load(background_image, background);
                arr_promise.push(background_promise);

                // 섬
                const island_image = require(`@/assets/animation/bg-island.png`);
                const island = this.$refs.island;
                const island_promise = this.image_load(island_image, island);
                arr_promise.push(island_promise);

                // 테스트랩
                const test_image = require(`@/assets/animation/building/test-lab.png`);
                const test = this.$refs.test;
                const test_promise = this.image_load(test_image, test);
                arr_promise.push(test_promise);

                // 진로카페
                const career_image = require(`@/assets/animation/building/career-cafe.png`);
                const career = this.$refs.career;
                const career_promise = this.image_load(career_image, career);
                arr_promise.push(career_promise);

                // 분수
                const fountain_image = require(`@/assets/animation/building/fountain.png`);
                const fountain = this.$refs.fountain;
                const fountain_promise = this.image_load(fountain_image, fountain);
                arr_promise.push(fountain_promise);

                // [캐릭터]루피 - 스탠딩
                const lufy_image = require(`@/assets/animation/lufy_standing/front01.png`);
                const lufy = this.$refs.lufy;
                const lufy_promise = this.image_load(lufy_image, lufy);
                arr_promise.push(lufy_promise);

                // [캐릭터]린 - 스탠딩
                const lyn_image = require(`@/assets/animation/lyn_standing/front01.png`);
                const lyn = this.$refs.lyn;
                const lyn_promise = this.image_load(lyn_image, lyn);
                arr_promise.push(lyn_promise);

                // 포트폴리오
                const construction_image = require(`@/assets/animation/building/portfolio.png`);
                const construction = this.$refs.construction;
                const construction_promise = this.image_load(construction_image, construction);
                arr_promise.push(construction_promise);

                // 공사중
                // const construction_image = require(`@/assets/animation/building/under-construction.png`);
                // const construction = this.$refs.construction;
                // const construction_promise = this.image_load(construction_image, construction);
                // arr_promise.push(construction_promise);

                // 홈스윗홈
                const home_image = require(`@/assets/animation/building/home-sweethome.png`);
                const home = this.$refs.home;
                const home_promise = this.image_load(home_image, home);
                arr_promise.push(home_promise);

                // [캐릭터]댓글 - 루피01
                const comment_lufy01_image = require(`@/assets/animation/character/comment/front01.png`);
                const comment_lufy01 = this.$refs.lufy01comment;
                const comment_lufy01_promise = this.image_load(comment_lufy01_image, comment_lufy01);
                arr_promise.push(comment_lufy01_promise);

                // [캐릭터]댓글 - 린01
                const comment_lyn01_image = require(`@/assets/animation/character/comment/front01.png`);
                const comment_lyn01 = this.$refs.lyn01comment;
                const comment_lyn01_promise = this.image_load(comment_lyn01_image, comment_lyn01);
                arr_promise.push(comment_lyn01_promise);

                // [캐릭터]댓글 - 바비01
                const comment_boby01_image = require(`@/assets/animation/character/comment/front01.png`);
                const comment_boby01 = this.$refs.boby01comment;
                const comment_boby01_promise = this.image_load(comment_boby01_image, comment_boby01);
                arr_promise.push(comment_boby01_promise);

                // [캐릭터]댓글 - 모나01
                const comment_mona01_image = require(`@/assets/animation/character/comment/front01.png`);
                const comment_mona01 = this.$refs.mona01comment;
                const comment_mona01_promise = this.image_load(comment_mona01_image, comment_mona01);
                arr_promise.push(comment_mona01_promise);

                // 퍼플동화
                const fairytale_image = require(`@/assets/animation/island/fairytale/front01.png`);
                const fairytale = this.$refs.fairytale;
                const fairytale_promise = this.image_load(fairytale_image, fairytale);
                arr_promise.push(fairytale_image);

                // 베리숲
                const forest_image = require(`@/assets/animation/island/forest/front01.png`);
                const forest = this.$refs.forest;
                const forest_promise = this.image_load(forest_image, forest);
                arr_promise.push(forest_promise);

                // 로그인
                let signin_image = require(`@/assets/animation/building/signin.png`);
                if(this.user) {
                    signin_image = require(`@/assets/animation/building/signout.png`);
                }
                const signin = this.$refs.signin;
                const signin_promise = this.image_load(signin_image, signin);
                arr_promise.push(signin_promise);

                // 로그아웃

                Promise.all(arr_promise).then((values) => {
                    this.isLoad = true;
                });
            },

            image_load(src, target) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const img = new Image();
                        img.src = src;
                        img.addEventListener("load", function() {
                            if(target && img) {
                                target.style.backgroundImage = `url('${img.src}')`;
                                resolve(true);
                            }
                        }, false);
                    }, 0);
                });
            },

            openDialogAlert(message, callback) {
                const payload = {
                    show: true,
                    message: message
                }
                if(typeof callback === "function") payload.btnFunc = callback;
                this.$store.dispatch(`dialog/alert/${ActionType.CHANGE_DIALOG_ALERT}`, payload);
            },

            async next(type) {
                switch(type) {
                    case "career":
                        this.$router.push({path: '/career'});
                        break;
                    case "market":
                        this.openDialogAlert('개발 진행중입니다.<br>기다려주세요.');
                        break;
                    case "test":
                        window.open('http://testlab.ppuple.com', '_self');
                        // this.$router.push({path: '/test/intro-1'});
                        break;
                    case "fairytale":
                        window.open('https://www.instagram.com/ppupletown', '_black');
                        break;
                    case "portfolio":
                        if(this.user) {
                            this.$router.push({path: `/portfolio/${this.user.shortcuts}`});
                        } else {
                            this.openDialogAlert('로그인이<br>필요합니다.', () => {
                                this.$router.push("/signin");
                            });
                        }
                        break;
                    case "home":
                        if(this.user) {
                            this.$router.push({path: `/home`});
                        } else {
                            this.openDialogAlert('로그인이<br>필요합니다.', () => {
                                this.$router.push("/signin");
                            });
                        }
                        break;
                    case "signin":
                        this.$router.push({path: `/signin`});
                        break;
                    default:
                        break;
                }
            },

            clickComment(character) {
                this.character = character;
            },

            clickCommentOtherArea() {
                this.character = undefined;
            }
        },

        mounted() {
            this.image();
        }
    }
</script>

<style lang="scss">
    // 메인 애니메이션
    @mixin animation ($delay, $duration, $name, $iteration, $direction) {
        animation-delay: $delay;
        animation-duration: $duration;
        animation-name: $name;
        animation-iteration-count: $iteration;
        animation-direction: $direction;
    }
    @mixin keyframe ($animation_name) {
        @keyframes #{$animation_name} {
            @content;
        }
    }
    @include keyframe (sbounce) {
        100% {
            transform: translateY(0.2vh);
        } 0% {
            transform: translateY(0vh);
        }
    }
    @include keyframe (bounce) {
        100% {
            transform: translateY(0.5vh);
        } 0% {
            transform: translateY(0vh);
        }
    }
    @include keyframe (fall) {
        100% {
            transform: translateY(15vh);
        } 0% {
            transform: translateY(0vh);
        }
    }

    .opacity-disabled {
        opacity: 0.5;
        cursor: default !important;
    }

    .clickarea {
        z-index: 999 !important;
        cursor: pointer !important;
    }

    // 메인 CSS
    .main-wrapper {
        flex: 0 0 100vh;
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        position: relative;

        .main-logo {
            width: calc(100% - 20px);
            max-width: calc(500px - 20px);
            z-index: 1;
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.7);
            margin: 5px 10px 10px 12px;

            img {
                width: 120px;
            }
        }

        .background {
            position: absolute;
            width: 100%;
            height: 100vh;
            background-position: center top;
            background-repeat: no-repeat;
            background-size: auto 137vh;
            display: flex;
            justify-content: center;

            .island {
                position: absolute;
                bottom: 8vh;
                width: 100%;
                height: 70vh;
                min-width: 600px;
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;

                .test-lab {
                    position: absolute;
                    width: 33vh;
                    height: 33vh;
                    top: -22vh;
                    left: calc(50% - 22vh);
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                    z-index: 2;
                    cursor: pointer;
                }

                .career-cafe {
                    position: absolute;
                    width: 26vh;
                    height: 26vh;
                    top: 0vh;
                    left: calc(50% - 2vh);
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                    z-index: 1;
                }

                .career-cafe-click {
                    position: absolute;
                    width: 26vh;
                    height: 26vh;
                    top: 0vh;
                    left: calc(50% - 2vh);
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                    z-index: 2;
                    cursor: pointer;
                }
                
                .fountain {
                    position: absolute;
                    width: 18vh;
                    height: 18vh;
                    top: 14vh;
                    left: calc(50% - 8.5vh);
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                    z-index: 1;
                }

                .character-lufy {
                    position: absolute;
                    width: 4.7vh;
                    height: 4.7vh;
                    top: 23vh;
                    left: calc(50% - 12.3vh);
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                    z-index: 2;
                }

                .character-lyn {
                    position: absolute;
                    width: 4.3vh;
                    height: 4.3vh;
                    top: 21vh;
                    left: calc(50% + 15vh);
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                    z-index: 2;
                }

                .under-construction {
                    position: absolute;
                    width: 16vh;
                    height: 16vh;
                    top: 31vh;
                    left: calc(50% - 20vh);
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                    z-index: 1;
                }

                .portfolio {
                    position: absolute;
                    width: 20vh;
                    height: 20vh;
                    top: 27vh;
                    left: calc(50% - 22vh);
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                    z-index: 1;
                }

                .home-sweethome {
                    position: absolute;
                    width: 24vh;
                    height: 24vh;
                    top: 40vh;
                    left: calc(50% - 3vh);
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                    z-index: 2;
                    cursor: pointer;
                }

                .character-comment-lufy01 {
                    position: absolute;
                    width: 4.5vh;
                    height: 4.5vh;
                    top: 20vh;
                    left: calc(50% - 10vh);
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                    z-index: 3;
                    cursor: pointer;
                }

                .character-comment-lyn01 {
                    position: absolute;
                    width: 4.2vh;
                    height: 4.2vh;
                    top: 17.5vh;
                    left: calc(50% + 13.5vh);
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                    z-index: 3;
                    cursor: pointer;
                }

                .character-comment-boby01 {
                    position: absolute;
                    width: 4.5vh;
                    height: 4.5vh;
                    top: 28.2vh;
                    left: calc(50% - 15vh);
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                    z-index: 3;
                    cursor: pointer;
                }

                .character-comment-mona01 {
                    position: absolute;
                    width: 4.5vh;
                    height: 4.5vh;
                    top: 52.2vh;
                    left: calc(50% + 3.8vh);
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                    z-index: 3;
                    cursor: pointer;
                }

                .island-fairytale {
                    position: absolute;
                    width: 9.9vh;
                    height: 9.9vh;
                    top: 21.2vh;
                    left: calc(50% - 23.8vh);
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                    @include animation (0s, 1s, bounce, infinite, alternate);
                    z-index: 3;
                    cursor: pointer;
                }

                .island-forest {
                    position: absolute;
                    width: 9.9vh;
                    height: 9.9vh;
                    top: 32vh;
                    left: calc(50% + 14.2vh);
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                    @include animation (0s, 1s, bounce, infinite, alternate);
                    z-index: 3;
                }

                .signin {
                    position: absolute;
                    width: 30vh;
                    height: 13vh;
                    top: -15vh;
                    left: calc(50% - 3.5vh);
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                    @include animation (0s, 1s, bounce, infinite, alternate);
                    z-index: 3;
                    cursor: pointer;
                }
            }
        }
    }
</style>