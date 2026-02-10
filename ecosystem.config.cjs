module.exports = {
  apps: [{
    name: 'dragon-hq-status',
    script: './server/status-server.js',
    cwd: '/home/ubuntu/clawd/dragon-hq',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '200M',
    env: {
      NODE_ENV: 'production'
    },
    error_file: './logs/status-error.log',
    out_file: './logs/status-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss'
  }]
};
