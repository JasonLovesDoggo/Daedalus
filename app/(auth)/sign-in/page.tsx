const SignInPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900">
      <form
        action={async (formData: FormData) => {
          "use server";

          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.get("email"),
              password: formData.get("password"),
            }),
          });

          const result = await response.json();

          console.log("result", result);
        }}
        className="w-full max-w-md rounded-lg bg-zinc-800 p-8 shadow-md"
      >
        <h1 className="mb-6 text-center text-3xl font-bold text-zinc-100">
          Sign In
        </h1>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-2 block font-medium text-zinc-400"
          >
            Email
          </label>
          <input
            className="w-full rounded-md border border-zinc-600 bg-zinc-700 px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            type="email"
            name="email"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="mb-2 block font-medium text-zinc-400"
          >
            Password
          </label>
          <input
            className="w-full rounded-md border border-zinc-600 bg-zinc-700 px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            type="password"
            name="password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-zinc-600 py-3 font-semibold text-zinc-100 transition duration-300 hover:bg-zinc-500"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};
export default SignInPage;
