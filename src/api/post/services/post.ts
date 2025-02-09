// /**
//  * post service
//  */

// const { createCoreService } = require("@strapi/strapi").factories;

// module.exports = createCoreService("api::post.post", ({ strapi }) => ({
//   async create(ctx) {
//     // const { users_permissions_user: userData } = ctx.data;
//     // if (!userData.email && !userData.connect?.id) {
//     //   return {
//     //     status: "404",
//     //     message: "User is required",
//     // };
//     // }
//     // let user;
//     // if (userData.email) {
//     //   user = await strapi.db.query('plugin::users-permissions.user').findOne({
//     //     filters: {
//     //       email: userData.email,
//     //     },
//     //   });
//     //   if (!user) {
//     //     return { status: "404", message: "User not found" };
//     //   }
//     // }
//     const newPost = await strapi.entityService.create("api::post.post", {
//       data: ctx.data,
//     });

//     return newPost;
//   },
// })); 

import { factories } from '@strapi/strapi';
export default factories.createCoreService('api::post.post');


