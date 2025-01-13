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
          host: 'smtp.gmail.com',
          port: 465,           
          secure: true,         
          auth: {
            user: env('SMTP_USER'),
            pass: env('SMTP_PASS'),
          },
        },
        settings: {
          defaultFrom: env('SMTP_USER'),
          defaultReplyTo: env('SMTP_USER'),
        },
      },
    },
  });