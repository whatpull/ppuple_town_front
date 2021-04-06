<template>
    <v-app>
        <v-main>
            <v-container 
                class="pa-0"
                fluid>
                <nuxt />
                <dialog-alert />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import DialogAlert from '~/components/common/dialog/DialogAlert.vue';
    import DialogConfirm from '~/components/common/dialog/DialogConfirm.vue';

    export default {
        // [BUG] Invalid component name: "layouts/empty.vue". 
        // Component names should conform to valid custom element name in html5 specification.
        // https://github.com/nuxt/nuxt.js/issues/7133
        name: 'Empty',
        
        components: {
            DialogAlert,
            DialogConfirm
        }
    }
</script>

<style scoped>
    body {
        padding: 0;
        margin: 0;
    }

    @media only screen and (min-width: 768px) {
        .container {
            max-width: initial !important;
        }
    }
</style>