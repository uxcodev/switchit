import { createStore } from 'vuex';

import { ref } from 'vue';
export const loading = ref(true);

import auth from './auth'
import filters from './filters'
import import_sheet from './import_sheet'
import import_ from './import'
import mobile from './mobile'
import ui from './ui'

const store = createStore({
  modules: {
    ui: ui,
    auth: auth,
    filters: filters,
    import: import_,
    import_sheet: import_sheet,
    mobile: mobile,
  },
});

export default store;