export default ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  // 'strapi::cors',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: ['https://amcred2-client.vercel.app'], // Add your frontend domain(s)
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  {
    name: 'strapi::session',
    config: {
      key: 'strapi.sid',
      secure: true,         // required with SameSite=None
      sameSite: 'none',     // needed for Google OAuth cross-site cookies
      rolling: false,
      renew: false,
      proxy: true,          // tell koa-session to trust the proxy
    },
  },
  // {
  //   name: 'strapi::session',
  //   config: {
  //     enabled: true,
  //     // Other session configurations if needed
  //     // Ensure secure is set based on environment if not handled by proxy trust
  //     secure: env('NODE_ENV') === 'production',
  //     proxy: true, // Explicitly enable proxy mode for the session middleware
  //   },
  // },
  // 'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
