'use strict';

module.exports = {
  createPost: async (ctx, next) => {
    try {
      const data = await strapi
        .service("api::c-post.c-post")
        .createPost(ctx.request.body);
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("create post controller error", { moreDetails: err });
    }
  }
};