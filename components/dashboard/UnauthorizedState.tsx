import Link from "next/link";

export const UnauthorizedState = () => {
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
