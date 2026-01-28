"use server";

import { blogService } from "@/services/blogService";

export const getBlogs = async () => {
  console.log("get blogs");
  const data = await blogService.getBlogPosts();
  console.log("action", data);
  return data;
};
