const axios = require('axios')
var rp = require('request-promise');

class AuthenticateClient {
  constructor(baseURL, subdomain) {
    this.baseURL = baseURL
    this.subdomain = subdomain

    let options = {
      baseURL,
      'headers': {
        'subDomain': subdomain,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Request-Headers': 'Content-Type',
        'Access-Control-Request-Method': 'POST'
      },
      mode: 'no-cors',
      withCredentials: true
    }

    this.http = axios.create(options)
  }

  async login(username, password) {
    try {
      // let response = await rp({
      //   uri: this.baseUrl + "login/",
      //   'headers': {
      //     'subDomain': this.subdomain,
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json'
      //   },
      //   body: { username: username, password: password }
      // })

      let response = await this.http.post("/login", { username: username, password: password })
      return response.data
    } catch (ex) {
      if (ex.response.status === 405) {
        throw new Error(ex.response.status, ex.response.data)
      }
    }

  }
}

class Client {
  constructor(baseURL, token) {
    let options = {
      baseURL,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }

    this._http = axios.create(options)
  }

  async get(resource) {
    return await this._http.get(resource)
  }

  async post(resource, data) {
    return await this._http.post(resource, data)
  }

  async put(resource, data) {
    return await this._http.put(resource, data)
  }

  async delete(resource) {
    return await this._http.delete(resource)
  }
}

module.exports = { Client, AuthenticateClient }
