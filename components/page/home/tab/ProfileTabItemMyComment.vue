<template>
    <v-tab-item
        class="ProfileTabItemMyComment pa-5"
        :value="'tab-2'" >
        <v-card 
            class="rounded-lg"
            min-width="100%"
            min-height="100%"
            style="overflow: hidden;"
            elevation="1">
            
            <!-- 리펙토링:리스트 컴포넌트 분리(필요시) -->
            <v-list 
                class="py-0"
                tile>
                <v-list-item-group
                    color="#7666D1">
                    <career-board-comment-item 
                        v-for="(item, index) of comments" 
                        :key="index"
                        :item="item"
                        @click.prevent="clickCommentsItem(item)" />
                </v-list-item-group>
            </v-list>

        </v-card>
        <career-board-comment-editor :detailData="detailData"/>
    </v-tab-item>
</template>

<script>
    import { mapGetters } from "vuex";

    import CareerBoardCommentItem from '~/components/page/career/board/detail/CareerBoardCommentItem.vue';
    import CareerBoardCommentEditor from '~/components/page/career/board/editor/CareerBoardCommentEditor.vue';

    export default {
        components: {
            CareerBoardCommentItem,
            CareerBoardCommentEditor
        },

        data() {
            return {
                detailData: { }
            }
        },

        computed: {
            ...mapGetters({
                comments: 'user/career/comment/comments'
            })
        },

        methods: {
            clickCommentsItem(item) {
                console.log(item.career);
                this.detailData = item.career;
            }
        }
    }
</script>

<style scoped>
    .ProfileTabItemMyComment {
        height: 100%;
    }
</style>