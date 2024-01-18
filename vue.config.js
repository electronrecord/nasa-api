// this prevents the dev server from throwing "invalid host header"
module.exports = {
  devServer: {
    allowedHosts: "all",
    client: { webSocketURL: "auto://0.0.0.0:0/ws" },
    proxy: {
      "/api/": {
        target: `https://nasa.testenv.ro/api/`,
        changeOrigin: true,
        pathRewrite: {
          "^/api/": "",
        },
      },
    },
  },
};

// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   devServer: {
//     proxy: {
//       '/api/': {
//         target: `${process.env.PROXY}/api/`,
//         changeOrigin: true,
//         pathRewrite: {
//           '^/api/': ''
//         }
//       }
//     }
//   }
// })
