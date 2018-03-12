const { Client, AuthenticateClient } = require('./http-utils')
const Tags = require('./tags')

class Octadesk {
  constructor(baseURL, accessToken) {
    this.baseURL = baseURL

    if(accessToken){
    this._client = new Client(baseURL, accessToken)
    this._initializeSubApis()
    }
  }

  async authenticate(subdomain, username, password) {
    let client = new AuthenticateClient(this.baseURL, subdomain)
    const response = await client.login(username, password)

    if (response && response.token) {
      this._client = new Client(this.baseURL, response.token)
      this._initializeSubApis()
      return response.token
    } else {
      return Error("Credentials invalid")
    }
  }

  async _initializeSubApis() {
    this.tags = new Tags(this._client)
  }
}

module.exports = Octadesk
