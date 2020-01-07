require("dotenv").config();

export default {
  API_ENDPOINT: process.env.REACT_APP_WP_API_ENDPOINT,
  TOKEN_KEY: "wp-auth-token"
};
