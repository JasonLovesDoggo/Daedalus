import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";

const Home = async () => {
  const session = await auth();

  console.log("session", session);

  return (
    <>
      {session?.user && (
        <div className="text-8xl">
          {session.user.email} is currently logged in
        </div>
      )}
      <form
        action={async (formData: FormData) => {
          "use server";

          console.log(formData);
          const result = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
          });

          console.log("result", result);
        }}
        className="grid place-items-center"
      >
        <label htmlFor="email">Email</label>
        <input
          className="w-80 rounded-md border-black px-3 py-2 shadow-md"
          type="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          className="w-80 rounded-md border-black px-3 py-2 shadow-md"
          type="password"
          name="password"
        />
        <button>submit</button>
      </form>
    </>
  );
};
export default Home;
