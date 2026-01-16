import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "../../components/ui/button";

const PracticeLayout = ({
  children,
  marketingSlot,
  salesSlot,
}: {
  children: ReactNode;
  marketingSlot: ReactNode;
  salesSlot: ReactNode;
}) => {
  return (
    <div className="p-5">
      <div className="space-x-2">
        <Link href={"/development"}>
          <Button>Development</Button>
        </Link>
        <Link href={"/testing"}>
          <Button>Testing</Button>
        </Link>
        <Link href={"/marketing"}>
          <Button>Marketing</Button>
        </Link>
        <Link href={"/marketing/settings"}>
          <Button>settings</Button>
        </Link>
        <Link href={"/sales"}>
          <Button>sales</Button>
        </Link>
      </div>

      <div className="flex">
        {marketingSlot}
        {salesSlot}
      </div>

      {children}
    </div>
  );
};

export default PracticeLayout;
