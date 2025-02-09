export default {
  routes: [
    {
      method: "POST",
      path: "/c-plugin/get-post-slug",
      handler: "c-plugin.getPostSlug",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/c-plugin/check-uniq-post-title",
      handler: "c-plugin.checkUniqPostTitle",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/c-plugin/get-uniq-post-slug",
      handler: "c-plugin.getUniqPostSlug",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
