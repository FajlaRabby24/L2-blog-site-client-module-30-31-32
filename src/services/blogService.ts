import { env } from "@/env";

export const blogService = {
  getBlogPosts: async () => {
    try {
      // ? when try to data don't cache
      // const res = await fetch(`${env.API_URL}/api/posts`, {
      //   cache: "no-store",
      // });

      const res = await fetch(`${env.API_URL}/api/posts`, {
        next: { revalidate: 10 },
      });

      const data = await res.json();

      if (!data.ok) {
        return {
          ok: false,
          data: null,
          error: {
            message: "Something went wrong!",
          },
        };
      }

      return {
        ok: true,
        data,
        error: null,
      };
    } catch (error) {
      return {
        ok: false,
        data: null,
        error: {
          message: "Something went wrong!",
        },
      };
    }
  },
};
