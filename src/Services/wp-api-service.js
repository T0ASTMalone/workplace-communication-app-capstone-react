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
  },

  getUsers(id, type) {
    return fetch(`${config.API_ENDPOINT}/users/wp/${id}?type=${type}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  getWpPosts(id, type) {
    return fetch(`${config.API_ENDPOINT}/posts/${id}/wp?type=${type}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  post(post) {
    return fetch(`${config.API_ENDPOINT}/posts`, {
      method: "POST",
      body: JSON.stringify(post),
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
