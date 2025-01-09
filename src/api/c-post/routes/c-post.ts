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
  ],
};
