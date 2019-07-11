export const environment = {
  production: true,

  config: {},

  serverConfig: {
    SERVER_URL: location.protocol + "//" + location.hostname + ((location.port) ? ':' + location.port : '')
  }
  
};
