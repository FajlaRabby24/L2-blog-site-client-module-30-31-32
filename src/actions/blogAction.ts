"use server";

import { blogService, IBlogData } from "@/services/blogService";
import { updateTag } from "next/cache";

export const getBlogs = async () => {
  const data = await blogService.getBlogPosts();
  return data;
};

export const createBlogPost = async (data: IBlogData) => {
  const result = await blogService.createBlogPost(data);
  updateTag("blogPosts");
  return result;
};
