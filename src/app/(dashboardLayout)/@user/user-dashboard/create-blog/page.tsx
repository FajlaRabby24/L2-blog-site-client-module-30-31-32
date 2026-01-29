import { CreateBlogFormClient } from "@/components/modules/user/createBlog/CreateBlogFromClient";
import { blogService } from "@/services/blogService";
import { BlogPost } from "@/types";

const CreateBlogPage = async () => {
  const { data } = await blogService.getBlogPosts({}, { cache: "no-store" });

  return (
    <div>
      {/* <CreateBlogFormServer /> */}
      <CreateBlogFormClient />
      {data?.map((item: BlogPost) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
};

export default CreateBlogPage;
