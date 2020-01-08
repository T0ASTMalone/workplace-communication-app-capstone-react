import config from "../config";
import TokenService from "./token-service";
import IdleService from "./idle-service";

const AuthApiService = {
  postCreator(info) {
    const wp = {
      name: info.wp_name,
      type: info.wp_type
    };
    // new creator
    const user = {
      username: info.username,
      type: info.user_type,
      password: info.password,
      nickname: info.nickname,
      img: info.img
    };
    // create wp
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

      return res.json().then(resJson => {
        // get wp code and id
        const { wp_code, wp_id } = resJson;

        // add code to new creator object
        user.code = wp_code;

        // post user to db
        return fetch(`${config.API_ENDPOINT}/users`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(user)
        }).then(res2 =>
          // if user failed to post delete workplace that was just created
          !res2.ok
            ? res2.json().then(e => {
                // delete wp
                fetch(`${config.API_ENDPOINT}/wp/err/${wp_id}`, {
                  method: "DELETE",
                  headers: {
                    "content-type": "application/json"
                  }
                }).then(res3 => {
                  if (!res3.ok) res3.json().then(e => Promise.reject(e));
                });
                return Promise.reject(e);
              })
            : res2.json()
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
