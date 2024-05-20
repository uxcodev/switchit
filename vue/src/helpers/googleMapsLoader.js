// googleMapsLoader.js
export default function loadGoogleMapsApi(callbackName) {
  return new Promise((resolve, reject) => {
    if (window.google) {
      // Google Maps API has already been loaded
      resolve(window.google);
    } else {
      window[callbackName] = function () {
        // API has fully loaded.
        resolve(window.google);

        // Cleanup
        delete window[callbackName];
      };

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_API_KEY}&libraries=places&callback=initMap&loading=async`;
      // script.async = true;
      // script.defer = true;
      script.addEventListener('error', reject);
      document.head.appendChild(script);
    }
  });
}
