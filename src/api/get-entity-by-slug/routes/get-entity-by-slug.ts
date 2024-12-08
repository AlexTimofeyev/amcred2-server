export default {
  routes: [
    {
     method: 'GET',
     path: '/get-entity-by-slug',
     handler: 'get-entity-by-slug.getEntityBySlug',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
