import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "../../../../components/ui/button";

const AnalyticsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div>
        <Link href={"/dashboard/analytics/weekly"}>
          <Button>Weekly</Button>
        </Link>
        <Link href={"/dashboard/analytics/monthly"}>
          <Button>Monthly</Button>
        </Link>
      </div>

      {children}
    </div>
  );
};

export default AnalyticsLayout;
