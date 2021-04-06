<template>
    <v-tab-item
        class="ProfileTabItemMyBoard pa-5"
        :value="'tab-1'" >
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
                    <career-board-item 
                        v-for="(item, index) of careers" 
                        :key="index"
                        :item="item" />
                </v-list-item-group>
            </v-list>

        </v-card>
    </v-tab-item>
</template>

<script>
    import { mapGetters } from "vuex";

    import CareerBoardItem from '~/components/page/career/board/CareerBoardItem.vue';

    export default {
        components: {
            CareerBoardItem
        },

        computed: {
            ...mapGetters({
                careers: 'user/career/list/careers'
            })
        }
    }
</script>

<style scoped>
    .ProfileTabItemMyBoard {
        height: 100%;
    }
</style>