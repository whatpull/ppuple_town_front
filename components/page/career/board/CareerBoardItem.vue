<template>
    <v-list-item 
        class="px-0"
        :ripple="false"
        @click="clickCareerBoardItem">
        <div class="CareerBoardItem"> 
            <div class="Icon">
                <div class="Image mb-2">
                    <v-img
                        aspect-ratio="1"
                        contain
                        width="50px"
                        :src="item.type.icon">
                    </v-img>
                </div>
                <div class="Time">
                    {{ regDate }}
                </div>
            </div>
            <div class="Content">
                <div class="Title">
                    <span class="TitleCategory">{{ item.type.text }}</span> 
                    <span class="TitleText">{{ item.title }}</span>
                </div>
                <div 
                    class="Summary mt-1"
                    v-html="summary">
                </div>
            </div>
            <div class="Comment">
                <div class="Count">
                    {{ commentCount }}
                </div>
            </div>
        </div>
    </v-list-item>
</template>

<script>
    export default {
        props: {
            item: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },

        computed: {
            summary() {
                return this.item.content.replace(/(<([^>]+)>)/ig,"").substring(0, 300);
            },

            regDate() {
                const now = this.$moment();
                const reg = this.$moment(this.item.regDate);
                
                const days = this.$moment.duration(now.diff(reg)).days();
                const hours = this.$moment.duration(now.diff(reg)).hours();
                const minutes = this.$moment.duration(now.diff(reg)).minutes();
                const seconds = this.$moment.duration(now.diff(reg)).seconds();

                let result = this.$moment(this.item.regDate).format('MM월 DD일');
                if(days === 0) {
                    if(hours > 0) {
                        result = `${hours}시간 전`;
                    } else if(minutes > 0) {
                        result = `${minutes}분 전`;
                    } else if(seconds > 0) {
                        result = `${seconds}초 전`;
                    }
                }
                return result;
            },

            commentCount() {
                return this.item.comment > 99 ? '99+' : this.item.comment;
            }
        },
        
        methods: {
            clickCareerBoardItem() {
                const cseq = this.item.cseq;
                this.$router.push(`/career/${cseq}`);
            }
        }
    }
</script>

<style scoped>
    .CareerBoardItem {
        flex: 1;
        display: flex;
        height: 100px;
        border-bottom: 1px solid #EFECFF;
    }

    .CareerBoardItem .Icon {
        flex: 0 0 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .CareerBoardItem .Icon .Time {
        color: #9E9E9E;
        font-size: 12px;
        font-weight: bold;
    }

    .CareerBoardItem .Content {
        flex: 1;
        padding: 15px 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .CareerBoardItem .Content .Title {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* 라인수 */
        -webkit-box-orient: vertical;
        word-wrap:break-word;
        word-break:break-all;
        height: 1.5em;
    }

    .CareerBoardItem .Content .Title .TitleCategory {
        color: #7666D1;
        font-weight: bold;
    }

    .CareerBoardItem .Content .Title .TitleText {
        color: #707070;
        font-weight: bold;
    }

    .CareerBoardItem .Content .Summary {
        color: #6D6D6D;
        font-size: 14px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* 라인수 */
        -webkit-box-orient: vertical;
        word-wrap:break-word;
        word-break:break-all;
        max-height: 3em;
    }

    .CareerBoardItem .Comment {
        flex: 0 0 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 1;
    }

    .CareerBoardItem .Comment .Count {
        width: 60px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #7666D1;
        font-size: 14px;
        font-weight: bold;
        background-image: url('/image/icon/comment.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 35px;
    }
</style>