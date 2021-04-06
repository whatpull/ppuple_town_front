<template>
    <div class="main-footer-wrapper" ref="background">
        <div class="dotum footer-info">
            (주)한팀 | 대표이사 : 박예선<br/>
            사업자등록번호: 559-86-01091<br/>
            주소: (21984) 인천광역시 연수구 송도동 174-1, 810호<br/>
            통신판매업신고 : 2020-인천연수구-0800<br/>
            Copyrightⓒ Hanteam Corp. All rights reserved.
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            image() {
                const arr_promise = [];
                // 배경
                const background_image = require(`@/assets/animation/bg-landscape.png`);
                const background = this.$refs.background;
                const background_promise = this.image_load(background_image, background);
                arr_promise.push(background_promise);
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
            }
        },

        mounted() {
            this.image();
        }
    }
</script>

<style scoped>
    .main-footer-wrapper {
        flex: 0 0 200px;
        width: 100%;
        height: 200px;
        display: flex;
        justify-content: center;
        position: relative;
        overflow: hidden;
        background-position: center -100vh;
        background-repeat: no-repeat;
        background-size: auto 137vh;
    }
    
    .footer-info {
        width: 100%;
        max-width: calc(500px - 20px);
        min-width: calc(320px - 20px);
        z-index: 1;
        font-size: 13px;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.7);
        margin: 90px auto 10px auto;
        padding: 0px 10px;
    }
</style>