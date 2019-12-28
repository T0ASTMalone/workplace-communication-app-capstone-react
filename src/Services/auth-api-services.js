import config from "../config";
import TokenService from "./token-service";
import IdleService from "./idle-service";

const AuthApiService = {
  postCreator(info) {
    const wp = {
      name: info.wp_name,
      type: info.wp_type
    };

    const user = {
      username: info.username,
      type: info.user_type,
      password: info.password,
      nickname: info.nickname,
      img: info.img
    };

    return fetch(`${config.API_ENDPOINT}/wp`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(wp)
    }).then(res => {
      if (!res.ok) {
        return res.json().then(e => Promise.reject(e));
      }

      res.json().then(resJson => {
        const { wp_code, wp_id } = resJson;

        user.code = wp_code;

        return fetch(`${config.API_ENDPOINT}/users`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(user)
        }).then(res =>
          !res.ok
            ? res.json().then(e => {
                Promise.reject(e);
                return fetch(`${config.API_ENDPOINT}/wp/err/${wp_id}`, {
                  method: "DELETE",
                  headers: {
                    "content-type": "application/json"
                  }
                }).then(res =>
                  !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
                );
              })
            : res.json()
        );
      });
    });
  },

  postMember(user) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  postLogin(credentials) {
    console.log(credentials);
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      .then(res => {
        return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json();
      })
      .then(res => {
        TokenService.saveAuthToken(res.authToken);
        IdleService.registerIdleTimerResets();
        TokenService.queueCallBackBeforeExpiry(() =>
          AuthApiService.postRefreshToken()
        );
        return res;
      });
  },

  postRefreshToken() {
    return fetch(`${config.API_ENDPOINT}/auth/refresh`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      )
      .then(res => {
        TokenService.saveAuthToken(res.authToken);
        IdleService.registerIdleTimerResets();
        TokenService.queueCallBackBeforeExpiry(() =>
          AuthApiService.postRefreshToken()
        );
      })
      .catch(err => {
        console.error(err);
      });
  }
};

export default AuthApiService;
