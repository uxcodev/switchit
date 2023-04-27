import { createI18n } from 'vue-i18n';
import en from './locales/en-US'
import da from './locales/da-DK'

const messages = {
  'en-US': en,
  'da-DK': da
};

const i18n = createI18n({
  locale: 'en-US', // Set the initial locale
  fallbackLocale: 'en-US', // Set the fallback locale for when a translation is missing
  messages
});

export default i18n;


// import VueI18n from 'vue-i18n'
// import en from './locales/en'
// import da from './locales/da'

// const i18n = new VueI18n({
//   locale: 'en', // Set the initial locale
//   fallbackLocale: 'en', // Fallback locale
//   messages: {
//     en,
//     da,
//   }
// })
// export default i18n;
