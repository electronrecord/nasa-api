const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api/': {
        target: `${process.env.PROXY}/api/`,
        changeOrigin: true,
        pathRewrite: {
          '^/api/': ''
        }
      }
    }
  }
})
