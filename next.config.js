module.exports = {
  // async headers () {
  //   return [
  //     {
  //       source: '/login',
  //       headers: [
  //         {
  //           key: 'Access-Control-Allow-Origin',
  //           value: process.env.HOST_URL
  //         },
  //         {
  //           key: 'Access-Control-Allow-Methods',
  //           value: 'GET,DELETE,PATCH,POST,PUT'
  //         },
  //         {
  //           key: 'Access-Control-Allow-Credentials',
  //           value: 'true'
  //         },
  //         {
  //           key: 'Access-Control-Allow-Headers',
  //           value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  //         }
  //       ]
  //     }
  //   ]
  // },

  experimental: {
    serverActions: true
  }
}
