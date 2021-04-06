<template>
    <canvas 
        class="process-canvas" 
        ref="process" 
        width="900" 
        height="1300">
    </canvas>
</template>

<script>
    export default {
        props: {
            isLoad: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                canvas: undefined,
                context: undefined,
                resources: undefined,
                start: undefined,
                lotation: 10000,
                duration: 5000,
                distance: 50,
                raf: undefined
            }
        },

        computed: {
            getCanvasWidth() {
                return this.canvas.width;
            },

            getCanvasHeight() {
                return this.canvas.height;
            }
        },

        methods: {
            animate() {
                this.raf = requestAnimationFrame(this.raf_proccess);
            },

            raf_proccess(timestamp) {
                if (typeof this.start === "undefined") this.start = timestamp;
                const progress = Math.floor((timestamp - this.start));
                const fpd = Math.floor(this.raf_coordinate(progress, this.duration, this.distance));
                this.motion(progress, fpd);
                if (progress > this.lotation) { // 무한하게 증가하는 숫자를 초기화(단, 모든 duration이 10의 최소공약수)
                    this.start = timestamp;
                }
                this.raf = requestAnimationFrame(this.raf_proccess);
            },

            raf_coordinate(progress, duration, distance) {
                let fpd = 0;
                if(typeof progress === "number" && typeof duration === "number" && typeof distance === "number") {
                    fpd = Math.min((progress % duration) * (distance / duration), distance);
                }
                return fpd;
            },

            motion(progress, fpd) {
                if(this.context) {
                    // 공통 프레임 삭제
                    this.context.clearRect(0, 0, this.getCanvasWidth, this.getCanvasHeight);

                    const changeCount = 2;
                    const gab = Math.floor(progress / this.duration);
                    const step = (gab % changeCount); // 방향전환 2단계

                    // 01. 페니 - 걷기
                    let img, x = 310, y = 420, type, ratio = 1.4;
                    if(step === 0) {
                        type = "front";
                        x = x - (fpd * ratio);
                        y = y + (fpd * ratio);
                    } else { 
                        type = "back";
                        x = (x - (this.distance * ratio)) + (fpd * ratio);
                        y = (y + (this.distance * ratio)) - (fpd * ratio);
                    }
                    img = this.resources.penny.walking[type][Math.floor((progress * ((this.distance / this.duration) * 0.5)) % 4)];
                    if(img) { this.context.drawImage(img, x, y); }

                    // 02. 알피 - 걷기
                    x = 445, y = 660, ratio = 0.8;
                    if(step === 0) {
                        x = x - (fpd * ratio);
                        y = y + (fpd * ratio);
                    } else {
                        x = (x - (this.distance * ratio)) + (fpd * ratio);
                        y = (y + (this.distance * ratio)) - (fpd * ratio);
                    }
                    img = this.resources.alpi.walking[type][Math.floor((progress * ((this.distance / this.duration) * 0.5)) % 4)];
                    if(img) { this.context.drawImage(img, x, y); }

                    // 03. 모나 - 걷기
                    x = 380, y = 860, ratio = 1.5;
                    if(step === 0) {
                        x = x + (fpd * ratio);
                        y = y + (fpd * ratio);
                    } else {
                        x = (x + (this.distance * ratio)) - (fpd * ratio);
                        y = (y + (this.distance * ratio)) - (fpd * ratio);
                    }
                    img = this.resources.mona.walking[type][Math.floor((progress * ((this.distance / this.duration) * 0.8)) % 4)];
                    if(img) { this.context.drawImage(img, x, y); }

                    // 04. 간판
                    // x = 618, y = 425;
                    // img = this.resources.display.changing["front"][Math.floor((progress * ((this.distance / this.duration) * 0.5)) % 3)];
                    // if(img) { this.context.drawImage(img, x, y); }


                    // 05. 타타 - 낚시
                    x = 370, y = 1215;
                    img = this.resources.tata.fishing["front"][Math.floor((progress * ((this.distance / this.duration) * 0.2)) % 2)];
                    if(img) { this.context.drawImage(img, x, y); }

                    // 06. 커피 - 드랍
                    // x = 247, y = 295, ratio = 1.5;
                    // y = y + (fpd * ratio);
                    // img = this.resources.coffee.dropping["front"][0];
                    // if(img) { this.context.drawImage(img, x, y); }

                    // 07. 린 - 팔 흔들기
                    x = 620, y = 565;
                    img = this.resources.lyn.shaking["front"][Math.floor((progress * ((this.distance / this.duration) * 0.4)) % 2)];
                    if(img) { this.context.drawImage(img, x, y); }

                    // 08. 바비 - 팔 흔들기
                    // x = 220, y = 825;
                    // img = this.resources.boby.shaking["front"][Math.floor((progress * ((this.distance / this.duration) * 0.4)) % 2)];
                    // if(img) { this.context.drawImage(img, x, y); }
                }
            },

            load(src, arr) { // 리소스(이미지) 로드
                const img = new Image();
                img.src = src;
                img.addEventListener("load", function() {
                    if(Array.isArray(arr)) arr.push(img);
                }.bind(this), false);
            },

            resource(motion) { // 리소스 준비
                let objects = [], types = [];
                switch(motion) {
                    case "walking": 
                        objects.push("penny");
                        objects.push("alpi");
                        objects.push("mona");
                        types.push("front01");
                        types.push("front02");
                        types.push("front03");
                        types.push("front02");
                        types.push("back01");
                        types.push("back02");
                        types.push("back03");
                        types.push("back02");
                        for(const character of objects) {
                            for(const type of types) {
                                this.load(require(`@/assets/animation/${character}_${motion}/${type}.png`), this.resources[character][motion][type.slice(0,-2)]);
                            }
                        }
                        break;
                    case "changing": 
                        objects.push("display");
                        types.push("front01");
                        types.push("front02");
                        types.push("front03");
                        for(const object of objects) {
                            for(const type of types) {
                                this.load(require(`@/assets/animation/building/${object}/${type}.png`), this.resources[object][motion][type.slice(0,-2)]);
                            }
                        }
                        break;
                    case "dropping":
                        objects.push("coffee");
                        types.push("front01");
                        for(const object of objects) {
                            for(const type of types) {
                                this.load(require(`@/assets/animation/building/${object}/${type}.png`), this.resources[object][motion][type.slice(0,-2)]);
                            }
                        }
                        break;
                    case "shaking":
                        objects.push("lyn");
                        objects.push("boby");
                        types.push("front01");
                        types.push("front02");
                        for(const character of objects) {
                            for(const type of types) {
                                this.load(require(`@/assets/animation/${character}_${motion}/${type}.png`), this.resources[character][motion][type.slice(0,-2)]);
                            }
                        }
                        break;
                    case "fishing":
                        objects.push("tata");
                        types.push("front01");
                        types.push("front02");
                        for(const character of objects) {
                            for(const type of types) {
                                this.load(require(`@/assets/animation/${character}_${motion}/${type}.png`), this.resources[character][motion][type.slice(0,-2)]);
                            }
                        }
                        break;
                    default:
                        break;
                }
            },
            
            init() {
                // step.1 캔버스, 캔버스 컨텍스트 지정
                if(typeof this.canvas === "undefined") {
                    this.canvas = this.$refs.process;
                }
                if(typeof this.context === "undefined") {
                    this.context = this.canvas.getContext('2d');
                }

                // step.2 리소스 준비
                if(typeof this.resources === "undefined") {
                    this.resources = {
                        penny: {
                            walking: {
                                front: [],
                                back: []
                            }
                        },
                        alpi: {
                            walking: {
                                front: [],
                                back: []
                            }
                        },
                        mona: {
                            walking: {
                                front: [],
                                back: []
                            }
                        },
                        lyn: {
                            shaking: {
                                front: []
                            }
                        },
                        boby: {
                            shaking: {
                                front: []
                            }
                        },
                        tata: {
                            fishing: {
                                front: []
                            }
                        },
                        display: {
                            changing: {
                                front: []
                            }
                        },
                        coffee: {
                            dropping: {
                                front: []
                            }
                        }
                    }
                }
                this.resource("walking");
                this.resource("changing");
                // this.resource("dropping");
                this.resource("fishing");
                this.resource("shaking");
            }
        },

        watch: {
            isLoad(isLoad) {
                if(isLoad) {
                    if(typeof this.raf === "undefined") {
                        this.animate();
                    }
                }
            }
        },

        mounted() {
            this.init();
        },

        beforeDestroy() {
            if(this.canvas) this.canvas = undefined;
            if(this.context) this.context = undefined;
            if(this.raf) {
                cancelAnimationFrame(this.raf);
                this.raf = undefined;
            }
        }
    }
</script>

<style scoped>
    .process-canvas {
        background: transparent;
        position: absolute;
        width: auto;
        height: 100vh;
        z-index: 1;
    }
</style>