require("dotenv").config();

export default {
  API_ENDPOINT: process.env.REACT_APP_MACROFY_API_ENDPOINT,
  TOKEN_KEY: "macrofy-auth-token"
};
