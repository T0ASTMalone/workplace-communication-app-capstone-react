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
  // post ideas of posts
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
  },

  // post acknowledgement method

  postAcknowledgement(ack) {
    return fetch(`${config.API_ENDPOINT}/seen`, {
      method: "POST",
      body: JSON.stringify(ack),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  deleteAcknowledgement(id) {
    return fetch(`${config.API_ENDPOINT}/seen/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => {
      if (!res.ok) res.json().then(e => Promise.reject(e));
    });
  },

  acceptPendingUser(id) {
    return fetch(`${config.API_ENDPOINT}/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ type: "user" }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.ok
    );
  },

  declinePendingUser(id) {
    return fetch(`${config.API_ENDPOINT}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.ok
    );
  }
};

export default WpService;
