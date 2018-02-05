const isProd = process.env.NODE_ENV === 'production'

const proUrl = 'http://118.89.161.150' // 生产环境api地址
const devUrl = 'http://118.89.161.150' // 开发api地址

const FaceUrl = isProd ? proUrl : devUrl

module.exports = {
  baseUrl: FaceUrl,
  client: {
    baseurl: '/',
    timeout: 10000
  },
  server: {
    baseurl: FaceUrl + '/',
    timeout: 10000
  }
}
