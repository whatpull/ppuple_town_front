<template>
    <div 
        class="DialogCharacterTalk" 
        v-show="isShow">
        <div class="Character">
            <img 
                v-if="character" 
                :src="comments[character].image">
        </div>
        <div class="Comment">
            <div 
                class="Name"
                v-if="character">
                {{comments[character].name}}
            </div>
            <div 
                class="Text"
                id="text">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            character: {
                type: String,
                default: undefined
            }
        },

        data() {
            return {
                array: [],
                timer: undefined,
                comments: {
                    lufy: {
                        image: require('@/assets/animation/talk/lufy.png'),
                        name: '루피',
                        text: '진로카페 가서 취준 꿀팁 좀 얻어와야겠다'
                    },
                    lyn: {
                        image: require('@/assets/animation/talk/lyn.png'),
                        name: '린',
                        text: '진로 고민 중? 테스트연구소에서 본캐를 찾아봐!'
                    },
                    boby: {
                        image: require('@/assets/animation/talk/boby.png'),
                        name: '바비',
                        text: '모두들 안 다치게 조심해. 좀만 더 힘내자구!'
                    },
                    mona: {
                        image: require('@/assets/animation/talk/mona.png'),
                        name: '모나',
                        text: '요즘 같은 때엔 집에 있어야지'
                    }
                }
            }
        },

        computed: {
            isShow() {
                return typeof this.character === "string";
            }
        },

        mounted() {
            if(this.character) {
                document.getElementById("text").innerHTML = "";
                this.array = this.comments[this.character].text.split("");
                this.typing();
            }
        },

        methods: {
            typing () {
                if (this.array.length > 0) {
                    document.getElementById("text").innerHTML += this.array.shift();
                } else {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(this.typing, 70); /* change 70 for speed */
            }
        },

        watch: {
            character(val) {
                if(val) {
                    document.getElementById("text").innerHTML = "";
                    this.array = this.comments[this.character].text.split("");
                    this.typing();
                }
            }
        }
    }
</script>

<style scoped>
    .DialogCharacterTalk {
        z-index: 999999;
        width: calc(100% - 30px);
        max-width: 450px;
        max-height: 150px;
        margin: 0px 15px;
        position: fixed;
        bottom: 20px;
        background-color: #ffffff;
        border-radius: 10px;
        padding: 2px;
    }

    .DialogCharacterTalk .Character {
        position: absolute;
        top: -80px;
        left: 15px;
        z-index: -1;
    }

    .DialogCharacterTalk .Character img {
        width: 50px;
    }

    .DialogCharacterTalk .Comment {
        width: 100%;
        height: 100%;
        min-height: 105px;
        /* background-color: #e2e2e2; */
        background: linear-gradient(143deg, #C2C2C5, #FEFEFE);
        border-radius: 10px;
        padding: 10px 20px;
        font-family: 'jua';
    }

    .DialogCharacterTalk .Comment .Name {
        font-size: 20px;
        color: #7666D1;
    }

    .DialogCharacterTalk .Comment .Text {
        font-size: 18px;
        overflow: hidden;
    }
</style>