"use client";

import { getBlogs } from "@/actions/blogAction";
import { useEffect, useState } from "react";

// export const dynamic = "force-dynamic";

const AboutPage = () => {
  const [data, setData] = useState();
  const [error, setError] = useState<{ message: string } | null>();
  console.log("about page");

  useEffect(() => {
    (async () => {
      const { data, error } = await getBlogs();
      console.log("use effect", data, error);

      setData(data);
      setError(error);
    })();
  }, []);

  return (
    <div>
      <h1>this is about page</h1>
    </div>
  );
};

export default AboutPage;
