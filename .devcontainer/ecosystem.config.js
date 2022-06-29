module.exports = {
  apps: [{
    script: ".devcontainer/server.js",
    watch: ["example/restfulAPI/src"],
    watch_delay: 1000
  }]
}
