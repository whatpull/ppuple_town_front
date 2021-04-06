<template>
    <v-row class="pa-3">
        <v-col
            v-for="(portfolio, index) in portfolioList "
            :key="index"
            cols="12" 
            sm="6">
            <v-responsive
                aspect-ratio="1">
                <portfolio-list-item
                    :isNonSignin="isNonSignin"
                    :portfolio="portfolio" />
            </v-responsive>
        </v-col>
        <v-col 
            v-show="isNonSignin === false"
            cols="12" 
            sm="6">
            <v-responsive
                aspect-ratio="1">
                <portfolio-list-item-add />
            </v-responsive>
        </v-col>
    </v-row>
</template>

<script>
    import { mapGetters } from "vuex";

    import PortfolioListItem from '~/components/page/portfolio/list/PortfolioListItem.vue';
    import PortfolioListItemAdd from '~/components/page/portfolio/list/PortfolioListItemAdd.vue';

    export default {
        components: {
            PortfolioListItem,
            PortfolioListItemAdd
        },

        props: {
            isNonSignin: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            ...mapGetters({
                portfolioList: 'portfolio/list/portfolioList'
            })
        },
    }
</script>