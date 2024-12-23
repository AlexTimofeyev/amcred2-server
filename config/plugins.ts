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