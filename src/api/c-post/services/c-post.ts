"use strict";

import { randomBytes } from "node:crypto";
import { z } from "zod";

const POST_TYPE = {
  GIVE_MONEY: "GIVE_MONEY",
  TAKE_MONEY: "TAKE_MONEY",
} as const;

const postSchema = z.object({
  id: z.string().optional(),
  user_id: z.string().optional(),
  title: z.string().min(2, "Required"),
  locations: z.array(z.string()),
  body: z.string().min(2, "Required"),
  type: z.enum([POST_TYPE.GIVE_MONEY, POST_TYPE.TAKE_MONEY]),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long" }),
  password: z.string().min(8).optional(),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number must be valid" }),
  company: z.string().optional(),
});

const generateSlug = async function (title: string): Promise<string> {
  const slug = await strapi
    .service("plugin::content-manager.uid")
    .generateUIDField({
      contentTypeUID: "api::post.post",
      field: "slug",
      data: { title },
    });
  return slug;
};

export function randomString(length = 8) {
  if (length % 2 !== 0) {
    length++;
  }
  return randomBytes(length / 2).toString("hex");
}

module.exports = {
  createPost: async (data: any) => {
    try {
      const parsedData = postSchema.parse(data);
      const slug = await generateSlug(parsedData.title);
      let user_id = data.user_id;
      let password = "";
      let user;

      const existingPost = await strapi.db.query("api::post.post").findOne({
        where: { slug },
      });

      if (existingPost) {
        throw Error("Post already exists with title: " + data.title);
      }

      if (user_id) {
        user = await strapi.query("plugin::users-permissions.user").findOne({
          where: {
            id: user_id,
          },
        });

        if (!user) {
          throw Error("Post userId invalid");
        }
      }

      if (!user_id) {
        password = parsedData.password || randomString(8);
        const newUserObject = {
          email: parsedData.email,
          username: parsedData.username,
          companyName: parsedData.company,
          phone: parsedData.phone,
          password,
          provider: "local",
          role: "3",
          // confirmed: false,
        };

        const orList: Record<string, string>[] = [
          { email: parsedData.email },
          { username: parsedData.username },
        ];

        if (parsedData.phone) {
          orList.push({ phone: parsedData.phone });
        }

        const existingUser = await strapi
          .query("plugin::users-permissions.user")
          .findOne({
            where: {
              $or: orList,
            },
          });

        if (existingUser) {
          throw Error(
            "User already exists with this email or username or phone"
          );
        }

        const newUser = await strapi
          .plugin("users-permissions")
          .service("user")
          .add(newUserObject);

        strapi
          .plugin("users-permissions")
          .service("user")
          .sendConfirmationEmail(newUser);

        user_id = newUser.id;
        user = newUser;
      }

      const newPost = await strapi.service("api::post.post").create({
        data: {
          title: parsedData.title,
          locations: parsedData.locations,
          slug,
          body: parsedData.body,
          users_permissions_user: user_id,
          publishedAt: null,
        },
      });

      return { post: newPost, user, password };
    } catch (err) {
      console.error(err);
      throw Error(err);
    }
  },

  getPostsWithStatus: async (ctx) => {
    try {
      const { page = 1, pageSize = 10 } = ctx.query;
      const { userId } = ctx.params;

      if (!userId) {
        ctx.throw(400, "Unable to fetch posts, 'userId' is requerd");
      }

      const [resultCount, result] = await Promise.all([
        strapi.db.connection.raw(`
          SELECT COUNT(DISTINCT p."document_id") AS count
          FROM "posts" p, "posts_users_permissions_user_lnk" pu, "up_users" u
          WHERE pu.post_id = p.id AND pu.user_id = u.id AND u.id = ?
          `, [userId]),
        strapi.db.connection.raw(`
          WITH grouped_posts AS (
              SELECT p."document_id", MIN(p.id) AS id
              FROM "posts" p
              JOIN "posts_users_permissions_user_lnk" pu ON pu.post_id = p.id
              WHERE pu.user_id = ?
              GROUP BY p."document_id"
          )
          SELECT 
            DISTINCT p."document_id", 
            p.*, 
            (select COUNT(DISTINCT c.id) FROM "plugin_comments_comments" as c WHERE c."related" = CONCAT('api::post.post:', p.document_id)) as comments
          FROM grouped_posts gp
          JOIN "posts" p ON p.id = gp.id
          ORDER BY p."created_at" DESC
          LIMIT ? OFFSET ?;
        `, [userId, pageSize, (page - 1) * pageSize])
      ]);

      const documentIds = [];
      const ids = [];
      const posts = result.rows || result;
      posts.forEach(post => {
        if (!post['document_id'] || !post['id']) {
          return;
        }
        documentIds.push(post['document_id']);
        ids.push(post['id']);
      });

      const documentPlaceholders = documentIds.map(() => '?').join(', ');
      const idPlaceholders = ids.map(() => '?').join(', ');

      const resultWithDates = await strapi.db.connection.raw(`
        SELECT p.published_at, p.updated_at, p.created_at, p.document_id, p.id  
        FROM "posts" p
        WHERE p."document_id" IN (${documentPlaceholders}) AND p."id" NOT IN (${idPlaceholders})`,
        [...documentIds, ...ids]);
      
      const postsWithDates = resultWithDates.rows || resultWithDates;
      const normalizedResultWithDates = postsWithDates.reduce((acc, item) => {
        acc[item['document_id']] = item;
        return acc;
      }, {});

      const resultWithStatus = posts.map(post => {
        let status = 'published';
        const dId = post['document_id'];

        const comparePublishedAt = normalizedResultWithDates[dId] && 
          new Date(normalizedResultWithDates[dId]['published_at']).getTime();
        const compareUpdatedAt = normalizedResultWithDates[dId] && 
          new Date(normalizedResultWithDates[dId]['updated_at']).getTime();

        const publishedAt =  new Date(post['published_at']).getTime();
        const updatedAt = new Date(post['updated_at']).getTime();

        if(!publishedAt && !comparePublishedAt) {
          status = 'draft';
        } else if((publishedAt || comparePublishedAt) && updatedAt !== compareUpdatedAt) {
          status = 'modified';
        }
        return {...post, status };
      });

      const counts = resultCount.rows || resultCount;
      const [data, total] = [resultWithStatus, counts?.[0]?.count];


      const meta = {
        pagination: {
          page: parseInt(page, 10),
          pageSize: parseInt(pageSize, 10),
          pageCount: Math.ceil(total / pageSize),
          total,
        }
      };

      return { data, meta };
    } catch (err) {
      console.log(err);
      ctx.throw(500, "Unable to fetch posts");
    }
  },
};
