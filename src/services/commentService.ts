import { env } from "@/env";

interface IGetCommentsParams {
  status: "REJECT" | "APPROVED";
}

export const commentService = {
  getComments: async (params?: IGetCommentsParams) => {
    try {
      const url = new URL(`${env.API_URL}/api/comments`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value) {
            url.searchParams.append(key, value);
          }
        });
      }

      console.log(url.toString());

      const res = await fetch(url.toString());
      const data = await res.json();

      if (!data.success) {
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
