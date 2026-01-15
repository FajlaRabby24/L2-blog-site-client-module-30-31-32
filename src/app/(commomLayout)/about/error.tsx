"use client";

import { useEffect } from "react";
import { Button } from "../../../components/ui/button";

const AboutError = ({
  error,
  reset,
}: {
  reset: () => void;
  error: Error & { digest?: string };
}) => {
  useEffect(() => {
    // we can pass this error to a logger
    console.error({ error });
  }, [error]);

  return (
    <div>
      <p>something went wrong!</p>
      <Button variant={"default"} onClick={() => reset()}>
        Retry
      </Button>
    </div>
  );
};

export default AboutError;
