export default {
  routes: [
    {
      method: 'POST',
      path: '/c-post/create-user-and-post',
      handler: 'c-post.createPost',
      config: {
        policies: [],
        middlewares: [],
      },
     },
     {
      method: 'GET',
      path: '/c-post/with-status/:userId',
      handler: 'c-post.getPostsWithStatus',
      config: {
        policies: [],
        middlewares: [],
      },
     },
  ],
};
