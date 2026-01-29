import { env } from "@/env";
import { cookies } from "next/headers";

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

export interface IBlogData {
  title: string;
  content: string;
  tags?: string[];
}

export const blogService = {
  getBlogPosts: async (params?: GetBlogsParams, options?: ServiceOptions) => {
    try {
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

      config.next = { ...config, tags: ["blogPosts"] };

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

  // create blog posts
  createBlogPost: async (blogData: IBlogData) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.API_URL}/api/posts`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();

      if (data?.error) {
        return {
          data: null,
          error: {
            message: "Error: Post not created.",
          },
        };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },
};
