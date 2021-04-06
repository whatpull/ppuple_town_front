<template>
    <v-list 
        class="py-0"
        tile>
        <v-list-item-group
            color="#7666D1">
            <career-board-item 
                v-for="(item, index) of list" 
                :key="index"
                :item="item" />
        </v-list-item-group>
    </v-list>
</template>

<script>
    import CareerBoardItem from '~/components/page/career/board/CareerBoardItem.vue';

    export default {
        components: {
            CareerBoardItem
        },

        props: {
            list: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        }
    }
</script>