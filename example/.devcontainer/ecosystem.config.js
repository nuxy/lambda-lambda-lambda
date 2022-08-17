module.exports = {
  apps: [{
    script: ".devcontainer/server.js",
    watch: ["restfulApiHandler/src"],
    watch_delay: 1000
  }]
}
