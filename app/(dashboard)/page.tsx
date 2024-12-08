import Link from "next/link";
import { currentUser } from "@/auth";

import { LogoutButton } from "@/components/auth/LoginButton";

const Home = async () => {
  const user = await currentUser();

  if (user) {
    return (
      <div className="mx-auto h-full w-full max-w-screen-lg space-y-6 px-4 py-8 md:space-y-8 md:px-8 md:py-12 lg:space-y-10 lg:px-12 lg:py-20 xl:space-y-12 xl:px-16 xl:py-28 2xl:py-32 min-[1850px]:max-w-screen-xl">
        {/* Dashboard Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-black md:text-4xl xl:text-5xl">
            Hello, {user.name?.split(" ")[0] || "User"}.
          </h1>
          <p className="text-lg font-light text-gray-500 md:text-xl xl:text-2xl">
            Welcome back!
          </p>
        </div>

        {/* Application Status Info */}
        <div className="w-full rounded-sm border border-gray-300 p-4 md:p-8 xl:p-12">
          <p className="text-center">APPLICATION STATUS</p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 lg:gap-10 xl:gap-12">
          {/* Countdown */}
          <div className="rounded-sm border border-gray-300 p-4 md:p-8 lg:col-span-2 xl:p-12">
            <p className="text-2xl font-black md:text-3xl">COUNTDOWN</p>
          </div>

          {/* Contact and FAQs */}
          <div className="relative rounded-sm border border-gray-300 p-4 md:p-8 xl:p-12">
            <span className="absolute left-2 top-2 text-5xl font-light text-black/25 md:text-6xl">
              ?
            </span>

            <div className="space-y-2 px-4">
              <p className="text-xl font-semibold md:text-2xl">
                Have questions?
              </p>
              <p className="font-light text-gray-500 md:text-lg">
                Ask our team!
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <button className="w-full rounded-full border px-3.5 py-2.5">
                button
              </button>
              <button className="w-full rounded-full border px-3.5 py-2.5">
                button
              </button>
            </div>
          </div>
        </div>
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
