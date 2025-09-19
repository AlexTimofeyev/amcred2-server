module.exports = ({ env }) => ({
  // 'users-permissions': {
  //   config: {
  //     email: {
  //       confirmation: {
  //         redirectUrl: 'https://your-custom-domain.com/success',
  //       },
  //     },
  //   },
  // },
    // seo: {
    //   enabled: true,
    // },
    // comments: {
    //   enabled: true,
    //   // config: {
    //   //   badWords: false,
    //   //   moderatorRoles: ["Authenticated"],
    //   //   approvalFlow: ["api::post.post"],
    //   //   entryLabel: {
    //   //     "*": ["Title", "title"],
    //   //     "api::post.post": ["MyField"],
    //   //   },
    //   //   blockedAuthorProps: ["name", "email"],
    //   //   reportReasons: {
    //   //     MY_CUSTOM_REASON: "MY_CUSTOM_REASON",
    //   //   },
    //   // },
    // },
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          // If you use Gmail, set SMTP_SERVICE=gmail and omit host/port/secure
          service: env('SMTP_SERVICE'),
          host: env('SMTP_HOST', 'smtp.gmail.com'),
          port: env.int('SMTP_PORT', 465),
          secure: env.bool('SMTP_SECURE', true),
          auth: {
            user: env('SMTP_USER'),
            pass: env('SMTP_PASS'),
          },
          // Helpful in Heroku to see detailed transport logs
          logger: env.bool('SMTP_LOGGER', true),
          debug: env.bool('SMTP_DEBUG', true),
          // Optionally tweak TLS if needed (generally not required for Gmail)
          // tls: { rejectUnauthorized: env.bool('SMTP_TLS_REJECT_UNAUTHORIZED', true) },
        },
        settings: {
          defaultFrom: env('EMAIL_FROM', env('SMTP_USER')),
          defaultReplyTo: env('EMAIL_REPLY_TO', env('SMTP_USER')),
        },
      },
    },
  });