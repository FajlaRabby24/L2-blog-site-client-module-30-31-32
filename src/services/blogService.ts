import { env } from "@/env";

/*
 * No Dynamic and No {cache: no-store} : SSG -> Static Page
 * {cache: no-store}: SSR -> Dynamic Page
 * next: {revalidate: 10}: ISR -> Mix between static and dynamic
 */

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetBlogsParams {
  isFeatured?: boolean;
  search?: string;
}

export const blogService = {
  getBlogPosts: async (params?: GetBlogsParams, options?: ServiceOptions) => {
    try {
      console.log("call from about page");
      // ? when try to data don't cache
      // const res = await fetch(`${env.API_URL}/api/posts`, {
      //   cache: "no-store",
      // });

      // ? data revalidate update 10 second
      // const res = await fetch(`${env.API_URL}/api/posts`, {
      //   next: { revalidate: 10 },
      // });

      const url = new URL(`${env.API_URL}/api/posts`);

      // url.searchParams.append("key", "value");
      // url.searchParams.append("hello", "world");

      // console.log(Object.entries(params));

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(url.toString(), config);

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
        data: data?.data,
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

  getBlogById: async (id: string) => {
    try {
      const res = await fetch(`${env.API_URL}/api/posts/${id}`);
      const data = await res.json();

      if (!data.success) {
        return {
          success: false,
          data: null,
          error: {
            message: "Something went wrong!",
          },
        };
      }

      return {
        success: true,
        data: data?.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: {
          message: "Something went wrong!",
        },
      };
    }
  },
};
