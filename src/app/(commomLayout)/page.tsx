import { blogService } from "@/services/blogService";
import { Button } from "../../components/ui/button";

export default async function Home() {
  const { data } = await blogService.getBlogPosts();
  console.log({ data });

  return (
    <div>
      <Button variant={"default"}>Click Here!</Button>
    </div>
  );
}
