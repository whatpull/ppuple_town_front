import global from '~/mixins.js/global.js';
import Vue from 'vue';

// 전역 믹스인
// https://ko.nuxtjs.org/guides/directory-structure/plugins/#global-mixins
if (!Vue.__my_mixin__) {
    Vue.__my__mixin__ = true;
    Vue.mixin(global);
}