"use strict";

/**
 * get-entity-by-slug service
 */

module.exports = {
  getEntityBySlug: async (locale: string, slug: string) => {
    try {
        const rawQuery = `
        SELECT s.type as content_type,
        CASE
            WHEN s.type = 'take-monies' THEN t_monies.take_money_id
            WHEN s.type = 'give-monies' THEN g_monies.give_mony_id
            ELSE NULL
        END AS content_id

        FROM "slugs" as s
        LEFT JOIN take_monies_slug_lnk AS t_monies
            ON s.type = 'take-monies' AND t_monies.slug_id = s.id
        LEFT JOIN give_monies_slug_lnk AS g_monies
            ON s.type = 'give-monies' AND g_monies.slug_id = s.id

        WHERE 
            s."locale" = ? and s."slug" = ?
        LIMIT 1`;
        const slugData = await strapi.db.connection.raw(rawQuery, [locale, slug]);
        console.log('slugData', slugData);
      return slugData;
    } catch (err) {
      console.error(err);
      return err;
    }
  },
};
