import axios from 'axios';
import store from '@/store/index.js'
import timezones from '@/data/timezones.json'

let util = {
  async getTimezoneFromLatLng(lat, lng) {
    let timezone = (await axios.get(`/util/get-timezone?lat=${lat}&lng=${lng}`)).data
    console.log('getTimezoneFromLatLng', timezone)
    return timezone
  },
  async getLocaleFromGooglePlace(place) {
    const { address_components: address } = place;

    const addressLine1 = place.name;
    const city = address.find(({ types }) => types.includes("locality"))?.long_name || "";
    const country_code = address.find(({ types }) => types.includes("country"))?.short_name || "";
    const postal_code = address.find(({ types }) => types.includes("postal_code"))?.short_name || "";
    const postal_code_suffix = address.find(({ types }) => types.includes("postal_code_suffix"))?.short_name || "";
    const state = address.find(({ types }) => types.includes("administrative_area_level_1"))?.short_name || "";
    const formatted_address = place.formatted_address;
    const lng = place.geometry.location.lng();
    const lat = place.geometry.location.lat();
    const currency = await store.dispatch('auth/setCurrencyByCountry', country_code)

    // get the timezone from google
    let response = await this.getTimezoneFromLatLng(lat, lng);

    // find the places timezone in the timezones json file
    const timezone = timezones.find(tz => tz.code === response.timeZoneId)
    if (timezone) {
      timezone.offset = place.utc_offset_minutes
    }


    const localeObj = {
      address: {
        addressLine1: addressLine1,
        city: city,
        country: country_code,
        state: state,
        postal_code: postal_code_suffix ? postal_code + ' ' + postal_code_suffix : postal_code,
        formatted_address: formatted_address
      },
      locale: {
        location: {
          lng: place.geometry.location.lng(),
          lat: place.geometry.location.lat()
        },
        timezone: timezone?.code,
        currency: currency
      },
      timezone: timezone
    };
    // let currency = await store.dispatch('auth/setCurrencyByCountry', country_code)
    // console.log('currency', currency)
    console.log('country_code', country_code)
    console.log('localeObj', localeObj)
    return localeObj;
  },
  // async uploadFile(file, path) {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('path', path);

  //   try {
  //     let response = (await axios.post(`${process.env.VUE_APP_API_URL}/testing/upload`, formData)).data
  //     let link = `http://${process.env.VUE_APP_SPACES_CDN}/${response.data.Key}`
  //     return link
  //   } catch (error) {
  //     return error
  //   }
  // },
}
export default util
