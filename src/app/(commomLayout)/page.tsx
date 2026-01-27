import { cookies } from "next/headers";
import { Button } from "../../components/ui/button";

export default async function Home() {
  const cookieStore = await cookies();
  // console.log(cookieStore.get("__next_hmr_refresh_hash__"));

  const res = await fetch(`http://localhost:5000/api/auth/get-session`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  const session = await res.json();
  console.log(session);

  return (
    <div>
      <Button variant={"default"}>Click Here!</Button>
    </div>
  );
}
