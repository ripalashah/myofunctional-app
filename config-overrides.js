// config-overrides.js
module.exports = function override(config, env) {
    // Customize the Webpack config here
    config.devServer = {
      ...config.devServer,
      setupMiddlewares: (middlewares, devServer) => {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }
        return middlewares;
      }
    };
  
    return config;
  };
  