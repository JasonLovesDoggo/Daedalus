const SignUpPage = () => {
  return (
    <div className="grid place-items-center pt-28">
      <form
        action={async (formData: FormData) => {
          "use server";

          console.log(formData);
          const result = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: "bebi",
              email: "bebicat@gmail.com",
              password: "asdfasdf",
            }),
          })
            .then((response) => response.json())
            .catch((error) => {
              console.log("error", error);
            });

          console.log("result", result);
        }}
        className="grid place-items-center gap-4 rounded-md border bg-gray-100 p-6"
      >
        <h1 className="text-2xl font-bold">Sign Up</h1>

        <label htmlFor="name" className="block text-lg">
          Name
        </label>
        <input
          className="w-80 rounded-md border-black px-3 py-2 shadow-md"
          type="text"
          name="name"
          required
        />

        <label htmlFor="email" className="block text-lg">
          Email
        </label>
        <input
          className="w-80 rounded-md border-black px-3 py-2 shadow-md"
          type="email"
          name="email"
          required
        />

        <label htmlFor="password" className="block text-lg">
          Password
        </label>
        <input
          className="w-80 rounded-md border-black px-3 py-2 shadow-md"
          type="password"
          name="password"
          required
        />

        <button
          type="submit"
          className="w-80 rounded-md bg-zinc-800 px-4 py-2 text-white shadow hover:bg-zinc-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
