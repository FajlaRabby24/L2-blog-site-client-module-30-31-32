import { ReactNode } from "react";

const BlogLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      this is blog layout
      {children}
    </div>
  );
};

export default BlogLayout;
