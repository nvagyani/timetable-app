import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi'
      },
      theme: {
        themes: {
          light: {
            primary: '#041e42',
            secondary: '#c7dcf0',
            accent: '#1d428a',
            success: '#407ec9',
            failure: '#ce0037'
          }
        }
      }
});
