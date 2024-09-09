const SignInPage = () => {
  return (
    <form
      action={async (formData: FormData) => {
        "use server";

        console.log(formData);
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
  );
};
export default SignInPage;
