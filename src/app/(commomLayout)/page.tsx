import { BlogCard } from "@/components/modules/homepage/BlogCard";
import { blogService } from "@/services/blogService";
import { BlogPost } from "@/types";

export default async function Home() {
  const { data } = await blogService.getBlogPosts();

  return (
    <div className="pt-10 grid grid-cols-3 max-w-7xl mx-auto px-4 gap-5">
      {data?.data?.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
