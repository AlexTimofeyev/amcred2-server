export default ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
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
      // Other session configurations if needed
      // Ensure secure is set based on environment if not handled by proxy trust
      secure: true,
      proxy: true, // Explicitly enable proxy mode for the session middleware
    },
  },
  'strapi::favicon',
  'strapi::public',
];
