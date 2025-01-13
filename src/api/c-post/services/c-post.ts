"use strict";
import  { randomBytes } from 'node:crypto';
import { z } from 'zod'; 

// Типи поста та статусу
const POST_TYPE = {
  GIVE_MONEY: 'GIVE_MONEY',
  TAKE_MONEY: 'TAKE_MONEY',
} as const;

const POST_STATUS = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
} as const;

const postSchema = z.object({
  id: z.string().optional(),
  user_id: z.string().optional(),
  title: z.string().min(2, "Required"),
  locations: z.array(z.string()),
  body: z.string().min(2, "Required"),
  type: z.enum([POST_TYPE.GIVE_MONEY, POST_TYPE.TAKE_MONEY]),
  // status: z.enum([POST_STATUS.DRAFT, POST_STATUS.PUBLISHED]),
  username: z.string().min(2, { message: "Username must be at least 2 characters long" }),
  password: z.string().min(8).optional(),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number must be valid" }),
  company: z.string().optional(),
});

const generateSlug = async function(title: string): Promise<string> {
  const slug = await strapi.service('plugin::content-manager.uid').generateUIDField({
        contentTypeUID: 'api::post.post',
        field: 'slug',
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
      let password = '';
      let user;

      const existingPost = await strapi.db.query('api::post.post').findOne({
        where: { slug },
      });

      if (existingPost) {
        throw Error('Post already exists with title: ' + data.title);
      }

      if (user_id) {
        user = await strapi.query('plugin::users-permissions.user').findOne({
          where: {
            id: user_id,
          } 
        });

        if (!user) {
          throw Error('Post userId invalid');
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
          provider: 'local',
          role: '3',
          // confirmed: false,
        };

        const orList: Record<string, string>[] = [
          { email: parsedData.email },
          { username: parsedData.username },
        ];

        if (parsedData.phone) {
          orList.push({ phone: parsedData.phone });
        }

        const existingUser = await strapi.query('plugin::users-permissions.user').findOne({
          where: {
            $or: orList,
          } 
        });

        if (existingUser) {
          throw Error('User already exists with this email or username or phone');
        }

        const newUser = await strapi
          .plugin('users-permissions')
          .service('user')
          .add(newUserObject);

        strapi
          .plugin('users-permissions')
          .service('user')
          .sendConfirmationEmail(newUser);

        user_id = newUser.id;
        user = newUser;
      }

      const newPost = await strapi.service('api::post.post').create({
        data: {
          title: parsedData.title,
          locations: parsedData.locations,
          slug,
          body: parsedData.body,
          users_permissions_user: user_id,
          publishedAt: null,
        }
      });
      
      return { post: newPost, user, password };
    } catch (err) {
      console.error(err);
      throw Error(err);
    }
  },
};
