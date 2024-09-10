import Link from "next/link";
import { currentUser, signOut } from "@/auth";

const Home = async () => {
  const user = await currentUser();

  if (user) {
    return (
      <div className="mb-20 rounded-md border-2 p-12 text-center">
        {user.name} is currently logged in.
        <form
          action={async () => {
            "use server";

            signOut({ redirect: false });
          }}
        >
          <button className="rounded-md border bg-zinc-900 px-3.5 py-2 text-white">
            Sign Out
          </button>
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
