module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'restfulApiHandler',
    description: 'Handler example with preconfigured routes and middleware.',
    version: '0.0.1',
  },
  servers: [{
    url: 'http://localhost:3000'
  }],
  components: {
    securitySchemes: {
      basicAuth: {
        type: 'http',
        scheme: 'basic'
      }
    }
  }
};
