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
  },
  getPostsWithStatus: async (ctx, next) => {
    try {
      const data = await strapi
        .service("api::c-post.c-post")
        .getPostsWithStatus(ctx);
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("get posts controller error", { moreDetails: err });
    }
  },
  unpublish: async (ctx, next) => {
    try {
      const data = await strapi
        .service("api::c-post.c-post")
        .unpublish(ctx);
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("get posts controller error", { moreDetails: err });
    }
  }
};