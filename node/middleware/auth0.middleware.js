const { auth } = require("express-oauth2-jwt-bearer");
const dotenv = require("dotenv");
var axios = require("axios").default;

dotenv.config();

const validateAccessToken = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE,
});

// const setAccess = (req, res, next) => {
//   console.log("Additional code executed before authentication");

//   var options = {
//     method: 'POST',
//     url: 'https://dev-qnluap6h.eu.auth0.com/oauth/token',
//     headers: { 'content-type': 'application/x-www-form-urlencoded' },
//     data: new URLSearchParams({
//       grant_type: 'client_credentials',
//       client_id: process.env.AUTH0_CLIENT_ID,
//       client_secret: process.env.AUTH0_CLIENT_SECRET,
//       audience: process.env.AUTH0_MANAGEMENT_API_AUDIENCE
//     })
//   };
//   console.log('options: ', options);
//   axios.request(options).then(function (response) {
//     console.log('response.data: ', response.data);
//   }).catch(function (error) {
//     console.error(error);
//   });
// };

module.exports = {
  validateAccessToken
  // setAccess
};


