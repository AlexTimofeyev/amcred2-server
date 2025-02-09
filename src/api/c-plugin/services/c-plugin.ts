"use strict";

import { z as schema } from "zod";

const getPostSlugSchema = schema.object({
  title: schema.string().min(2, { message: "Title length must be valid" }),
});
export type GetPostSlugSchemaType = schema.infer<typeof getPostSlugSchema>;

const generateSlug = async (title: string) => {
  const slug = await strapi
  .service("plugin::content-manager.uid")
  .generateUIDField({
    contentTypeUID: "api::post.post",
    field: "slug",
    data: { title },
  });
  return slug;
}

module.exports = {
  getPostSlug: async (
    data: GetPostSlugSchemaType
  ): Promise<{ slug: string }> => {
    try {
      const parsedData = getPostSlugSchema.parse(data);
      const slug = await generateSlug(parsedData.title);
      return { slug };
    } catch (err) {
      console.log(err);
      throw Error(err);
    }
  },


  checkUniqPostTitle: async (data: GetPostSlugSchemaType): Promise<{ isUniq: boolean }> => {
    try {
      const parsedData = getPostSlugSchema.parse(data);
      const slug = await generateSlug(parsedData.title);
      const post = await strapi.query("api::post.post").findOne({
        where: {
          slug,
        },
      });
      return { isUniq: !!post?.id };
    } catch (err) {
      console.log(err);
      throw Error(err);
    }
  },

  getUniqPostSlug: async (data: GetPostSlugSchemaType): Promise<{ slug: string }> => {
    try {
      const parsedData = getPostSlugSchema.parse(data);
      const slug = await generateSlug(parsedData.title);
      return { slug };
    } catch (err) {
      console.log(err);
      throw Error(err);
    }
  },
};
