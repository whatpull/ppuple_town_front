<template>
    <v-app
        style="overflow:hidden;">
        <layout-header 
            v-show="showHeader" />
        <v-main>
            <v-container 
                class="Shadow pa-0"
                ma-auto 
                fill-height 
                align-start
                fluid>
                <nuxt />
                <dialog-alert />
                <dialog-confirm />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import LayoutHeader from '~/components/common/layout/Header.vue';
    import DialogAlert from '~/components/common/dialog/DialogAlert.vue';
    import DialogConfirm from '~/components/common/dialog/DialogConfirm.vue';

    export default {
        // [BUG] Invalid component name: "layouts/default.vue". 
        // Component names should conform to valid custom element name in html5 specification.
        // https://github.com/nuxt/nuxt.js/issues/7133
        name: 'Default',

        components: {
            LayoutHeader,
            DialogAlert,
            DialogConfirm
        },

        computed: {
            showHeader() {
                const path = this.$route.path;
                let isShow = true;
                if(path === "/signin" 
                    || path === "/signup") {
                    isShow = false;
                }
                return isShow
            }
        }
    }
</script>

<style>
    body {
        padding: 0;
        margin: 0;
        overflow-x: hidden;
    }

    .text-common {
        color: #7666D1 !important;
    }

    .clickable {
        cursor: pointer;
    }

    .Shadow {
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    }

    .container {
        min-width: 280px !important;
    }
    
    @media only screen and (min-width: 768px) {
        .container {
            max-width: 768px !important;
        }
    }
</style>