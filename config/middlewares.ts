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
      origin: [env('CLIENT_URL', 'http://localhost:3000')],
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  {
    name: 'strapi::session',
    config: {
      enabled: true,
      // Configure cookie options via koa-session
      proxy: true,
      cookie: {
        // In production (behind HTTPS), secure must be true. In local HTTP, set false to avoid errors.
        secure: env.bool('SESSION_SECURE', env('NODE_ENV') === 'production'),
        httpOnly: true,
        // SameSite None requires secure=true; default to lax locally
        sameSite: env('SESSION_SAMESITE', env('NODE_ENV') === 'production' ? 'none' : 'lax'),
        // Optionally set a domain if you use a custom domain
        domain: env('SESSION_DOMAIN'),
      },
    },
  },
  'strapi::favicon',
  'strapi::public',
];
