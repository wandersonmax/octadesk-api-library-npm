const config = require('./test-config')
const assert = require('chai').assert

const Octadesk = require('..')

const baseUrl = config.get("API_BASEURL")

const octadesk = new Octadesk(baseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJkb21haW4iOiJ0ZXN0ZWJpZ291c3ByZCIsImlzc3VlZGF0ZSI6IjIwMTgtMDMtMTJUMjA6NTU6MzIuMTQ0WiIsImlzcyI6ImFwaS5vY3RhZGVzay5zZXJ2aWNlcyIsInJvbGUiOjIsImVtYWlsIjoicmFmYWVsLnNvYnJpbmhvQG9jdGFkZXNrLmNvbSIsIm5hbWUiOiJSYWZhZWwgSGVucmlxdWUiLCJ0eXBlIjoxLCJpZCI6IjU0ZDNiYzA0LWVmMjAtNDNlOS1iZTk2LWRhNzBkMzgyNzBiOSIsInJvbGVUeXBlIjoyLCJwZXJtaXNzaW9uVHlwZSI6MiwicGVybWlzc2lvblZpZXciOjEsImlhdCI6MTUyMDg4ODEzMn0.sK3Q-6Q-IFcxk27y_bdne_YD2xpE7xaT7Tt4QHv7xeo')

describe('api.tags', () => {
  describe('get', () => {
    it('should send GET request to /tags?keyword=teste', (done) => {

      octadesk.tags.get("teste")
        .then(tags => {
          assert.isOk(tags.length)
          assert.isOk(tags.find(tag => tag.name.indexOf("teste") >= 0))
          done()
        })
    })

    it('should send GET request to /tags/', (done) => {

      octadesk.tags.get("")
        .then(tags => {
          assert.isOk(tags.length)
          assert.isOk(tags.find(tag => tag.name.indexOf("") >= 0))
          done()
        });
    })
  })

  describe('create', () => {
    it('should send POST request to /tags/', (done) => {
      let randomStr = Math.random().toString(36).substring(7)
      octadesk.tags.create(randomStr)
        .then(response => {
          assert.isOk(response.success)

          octadesk.tags.get(randomStr)
            .then(tags => {
              assert.isOk(tags.length)
              done()
            })
        });
    })
  })
})
//}

