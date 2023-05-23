import { createAuth0 } from '@auth0/auth0-vue';

const auth0 = createAuth0({
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  clientId: process.env.VUE_APP_AUTH0_CLIENTID,
  authorizationParams: {
    audience: process.env.VUE_APP_AUTH0_AUDIENCE,
    redirect_uri: window.location.origin
  },
});

export default auth0;
