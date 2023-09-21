module.exports = {
  apps: [
    {
      name: 'Recibom',
      script: './.output/server/index.mjs',
      env_qa: {
     
      exec_mode: 'cluster',
      instances: 1,
      PORT: 21110,
      NODE_ENV: 'production',
      },
    },
  ],
};