require("dotenv").config();

const config = {
  API_ENDPOINT: process.env.REACT_APP_WP_API_ENDPOINT,
  TOKEN_KEY: "wp-auth-token"
};


export default config;
