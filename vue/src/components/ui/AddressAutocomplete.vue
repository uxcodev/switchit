<template>
  <div class="address_autocomplete_input">
    <input ref="addressInput" type="text"  v-model="formatted_address" data-lpignore="true" autocomplete="off" nativeSupport=true placeholder="" @input="onInput" />
  </div>
</template>

<script>
import loadGoogleMapsApi from '@/helpers/googleMapsLoader';

export default {
  props: ["init_address", "types"],
  emits: ["updateAddress"],
  data() {
    return {
      address: this.init_address || '',
      formatted_address: this.init_address?.formatted_address || ''
    };
  },
  methods: {
    onInput() {
      if (!this.formatted_address) {
        this.address = '';
        this.$emit("updateAddress", null);
      }
    }
  },
  async mounted() {
    const callbackName = 'initMap';
    const google = await loadGoogleMapsApi(callbackName);

    const addressInput = this.$refs.addressInput;
    const autocomplete = new google.maps.places.Autocomplete(addressInput, {
      componentRestrictions: null,
    });

    google.maps.event.addListener(autocomplete, "place_changed", () => {
      const place = autocomplete.getPlace();
      if (place) {
        // const { address_components: address } = place;
        // if country is defined in place, but there is no city or address, return 'country_only'
        // if (place.address.length === 1 && place.address[0].types.includes('country')) {
        //   place.country_only = true
        //   this.formatted_address = place.formatted_address;
        //   place.coordinates = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        //   this.$emit("updateAddress", place);
        //   return;
        // }
        this.formatted_address = place.formatted_address;
        this.address = place.formatted_address;
        place.isCountry = place.types?.includes('country');
        place.coordinates = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        console.log('place', place);
        this.$emit("updateAddress", place);
      }
    });
  },
  watch: {
    init_address(address) {
      this.address = address || '';
      this.formatted_address = address?.formatted_address || '';
    },
  },
};
</script>

<style scoped lang="sass">
.address_autocomplete_input
  width: 100%
  input
    width: 100%
</style>
