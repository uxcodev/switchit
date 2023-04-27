import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/da';
import 'dayjs/locale/en';

// Extend dayjs with required plugins
dayjs.extend(utc);
dayjs.extend(timezone);

export default {
  install(app) {
    app.config.globalProperties.$dayjs = dayjs;
  },
};

