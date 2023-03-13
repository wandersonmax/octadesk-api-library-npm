const axios = require('axios')

module.exports = class Login {
  constructor(baseURL, subdomain) {
    this.baseURL = baseURL
    this.subdomain = subdomain

    let options = {
      baseURL,
      'headers': {
        'subDomain': subdomain,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }

    this.http = axios.create(options)
  }

  async login(username, password) {
    try {
      let response = await this.http.post("/login", { username: username, password: password })
      return response.data
    } catch (ex) {
      if (ex.response.status === 405) {
        throw new Error(ex.response.status, ex.response.data)
      }
    }
  }

  async loginApiToken(apiToken, username) {
    try {
      let options = {
        'baseURL': this.baseURL,
        'headers': {
          'subDomain': 'iesb',
          'apiToken': apiToken,
          'username': username,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }

      let response = await axios.create(options).post("/login/apiToken", {})
      return response.data
    } catch (ex) {
      if (ex.response.status === 405) {
        throw new Error(ex.response.status, ex.response.data)
      }
    }
  }

  async resetPassword(email) {
    try {
      let response = await this.http.get(`/resetPassword?email=${email}`)
      return response.data
    } catch (ex) {
      if (ex.response.status === 405) {
        throw new Error(ex.response.status, ex.response.data)
      }
    }
  }
}
