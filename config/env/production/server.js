export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://amcred-server-de997fc648f5.herokuapp.com'), // прод: https://api.amcred.co.ua
  app: {
    keys: env.array('APP_KEYS'),
  },
  proxy: true,
});
