
import store from '@/store/index.js'

export default {
  install(app) {
    app.config.globalProperties.$formatFee = (fee) => {
      let locale = store.getters['auth/locale']
      let currency = store.getters['auth/currency']
      if (locale) {
        // console.log(fee)
        // console.log(locale)
        // console.log(currency)
        return new Intl.NumberFormat(locale,
          { style: 'currency', currency: currency })
          .format(fee)
      } else {
        return
      }
    }
  }
}
