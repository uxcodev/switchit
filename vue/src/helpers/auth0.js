import { createAuth0 } from '@auth0/auth0-vue';

const auth0 = createAuth0({
  domain: import.meta.env.VITE_APP_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_APP_AUTH0_CLIENTID,
  authorizationParams: {
    audience: import.meta.env.VITE_APP_AUTH0_AUDIENCE,
    redirect_uri: window.location.origin
  },
  scope: 'openid profile email',
});

export default auth0;
