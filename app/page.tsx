import Link from "next/link";
import { currentUser } from "@/auth";

import { LogoutButton } from "@/components/auth/LoginButton";

const Home = async () => {
  const user = await currentUser();

  if (user) {
    return (
      <div className="mx-auto my-20 max-w-xl rounded-md border-2 p-12 text-center">
        {user.name} is currently logged in.
        <LogoutButton className="" />
        <form
          action={async () => {
            "use server";

            const res = await fetch("http://localhost:3000/api/example");
            if (!res.ok) {
              console.log("[page.tsx] Error: ", res);
            } else {
              console.log("[page.tsx] Data: ", res);
            }
          }}
        >
          <button>click here to get session info</button>
        </form>
      </div>
    );
  }

  return (
    <div className="grid min-h-svh place-items-center">
      <p>You're not logged in.</p>

      <div className="flex flex-col gap-8 sm:flex-row md:gap-12 xl:gap-16">
        <Link
          href="/sign-in"
          className="rounded-md bg-zinc-900 px-4 py-2.5 tracking-widest text-zinc-100 transition-colors hover:bg-zinc-800"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="rounded-md bg-zinc-900 px-4 py-2.5 tracking-widest text-zinc-100 transition-colors hover:bg-zinc-800"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};
export default Home;
