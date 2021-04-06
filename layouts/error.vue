<template>
    <div class="Error d-flex justify-center align-center">
        <h1 v-if="error.statusCode === 404">{{ error.statusCode }}</h1>
    </div>
</template>

<script>
    export default {
        // [BUG] Invalid component name: "layouts/default.vue". 
        // Component names should conform to valid custom element name in html5 specification.
        // https://github.com/nuxt/nuxt.js/issues/7133
        name: 'Error',

        props: ['error']
    }
</script>

<style>
    .Error {
        width: 100%;
        height: 100%;
    }
</style>