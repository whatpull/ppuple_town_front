<template>
    <div class="ProfileTabWrapper">
        <v-tabs
            v-model="tab"
            class="ProfileTab"
            slider-color="#7666D1"
            centered
            light
            style="border-bottom: 1px solid #E9E9E9;">

            <v-tab
                class="font-weight-bold"
                active-class="text-common"
                href="#tab-1">
                게시글
            </v-tab>

            <v-tab 
                class="font-weight-bold"
                active-class="text-common"
                href="#tab-2">
                댓글
            </v-tab>
        </v-tabs>
        <v-tabs-items 
            class="ProfileTabItems"
            v-model="tab">
            <profile-tab-item-my-board />
            <profile-tab-item-my-comment />
        </v-tabs-items>
    </div>
</template>

<script>
    import ProfileTabItemMyBoard from '~/components/page/home/tab/ProfileTabItemMyBoard.vue';
    import ProfileTabItemMyComment from '~/components/page/home/tab/ProfileTabItemMyComment.vue';

    export default {
        components: {
            ProfileTabItemMyBoard,
            ProfileTabItemMyComment
        },

        data() {
            return {
                tab: null
            }
        }
    }
</script>

<style scoped>
    .ProfileTabWrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .ProfileTab {
        flex: 0 0 auto;
    }

    .ProfileTab /deep/ .v-slide-group__next, 
    .ProfileTab /deep/ .v-slide-group__prev {
        display: none !important;
    }

    .ProfileTabItems {
        flex: 1;
    }

    .ProfileTabItems /deep/ .v-window__container {
        height: 100%;
    }
</style>