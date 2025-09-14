// Path: ./config/env/production/server.js`
export default ({ env }) => ({
    proxy: true,
    url: env('MY_HEROKU_URL', 'https://amcred-server-de997fc648f5.herokuapp.com'), // Sets the public URL of the application.
    app: { 
         keys: env.array('APP_KEYS')
       },
   });