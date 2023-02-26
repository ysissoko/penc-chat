module.exports = {
  apps: [
    {
      name: "penc-chat",
      script: "./dist/run.js",
      env: {
        NODE_ENV: "production",
      },
    }
  ],
  deploy: {
    production: {
      user: "youssouf",
      host: "82.165.121.223",
      ref: "origin/main",
      ssh_options: "StrictHostKeyChecking=no",
      repo:
        "git@github.com-penc-chat:ysissoko/penc-chat.git",
      path: "/home/youssouf/node/apps/penc-chat",
      "pre-deploy-local": "",
      "post-deploy":
        "yarn install --production=true && yarn build && pm2 startOrRestart ecosystem.config.js",
      "pre-setup": "",
    },
  },
};
