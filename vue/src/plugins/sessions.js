export default {
  install(app) {
    app.config.globalProperties.$storeSessionValue = (key, value, maxAgeMinutes) => {
      const data = {
        timestamp: Date.now(),
        value,
        maxAge: maxAgeMinutes * 60 * 1000,
      };
      sessionStorage.setItem(key, JSON.stringify(data));

      console.log('data.maxAge: ', data.maxAge)
      setTimeout(() => {
        sessionStorage.removeItem(key);
        console.log('sessionStorage item removed:', key)
      }, data.maxAge);
    };

    app.config.globalProperties.$loadSessionValue = (key) => {
      console.log(key)
      const storedData = sessionStorage.getItem(key);
      // if (storedData) {
      //   const data = JSON.parse(storedData);
      //   return data
      // }
      if (storedData) {
        const data = JSON.parse(storedData);
        const currentTime = Date.now();
        if (!data.timestamp || currentTime - data.timestamp < data.maxAge) {
          // turn the stringified value back into a JS object
          // let array = JSON.parse(data.value);
          console.log('data.value: ', data.value)
          // console.log('array: ', array)
          return data.value;
        }
      }
      return null;
    };
  },
};


