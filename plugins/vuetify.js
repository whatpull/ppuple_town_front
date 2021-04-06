import 'material-design-icons-iconfont/dist/material-design-icons.css'; // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

export default ctx => {
    const vuetify = new Vuetify({
        icons: {
            iconfont: 'mdi', // 'md' || 
        }
    });
  
    ctx.app.vuetify = vuetify;
    ctx.$vuetify = vuetify.framework;
}