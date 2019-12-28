import TokenService from "../Services/token-service";
import config from "../config";

const WpService = {
  getUserInfo(id) {
    return fetch(`${config.API_ENDPOINT}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

export default WpService;
