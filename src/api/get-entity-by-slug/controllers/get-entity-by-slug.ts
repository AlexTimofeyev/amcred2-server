'use strict';

module.exports = {
  getEntityBySlug: async (ctx, next) => {
    try {
      const { locale, slug } = ctx.query;
      const data = await strapi
        .service("api::get-entity-by-slug.get-entity-by-slug")
        .getEntityBySlug(locale, slug);
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Get articles controller error", { moreDetails: err });
    }
  }
};