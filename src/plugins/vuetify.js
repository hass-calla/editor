import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    icons: {
      iconfont: 'mdiSvg',
    },
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: colors.lightBlue.base,
        secondary: colors.indigo.base,
        accent: colors.purple.base,
        error: colors.red.base,
        warning: colors.deepOrange.base,
        info: colors.teal.base,
        success: colors.green.base,
        gray: colors.grey.base
      },
    },
  },
})
