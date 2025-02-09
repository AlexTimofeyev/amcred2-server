'use strict';

module.exports = {
  getPostSlug: async (ctx, next) => {
    try {
      const slug = await strapi
        .service("api::c-plugin.c-plugin")
        .getPostSlug(ctx.request.body);
      ctx.body = slug;
    } catch (err) {
      ctx.badRequest("get slug controller error", { moreDetails: err });
    }
  },
  checkUniqPostTitle: async (ctx, next) => {
    try {
      const isUniq = await strapi
        .service("api::c-plugin.c-plugin")
        .checkUniqPostTitle(ctx.request.body);
      ctx.body = isUniq;
    } catch (err) {
      ctx.badRequest("get slug controller error", { moreDetails: err });
    }
  },
  getUniqPostSlug: async (ctx, next) => {
    try {
      const slug = await strapi
        .service("api::c-plugin.c-plugin")
        .getUniqPostSlug(ctx.request.body);
      ctx.body = slug;
    } catch (err) {
      ctx.badRequest("get slug controller error", { moreDetails: err });
    }
  }
};