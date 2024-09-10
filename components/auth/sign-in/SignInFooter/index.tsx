type Props = {};

const SignInFooter = ({}: Props) => {
  return (
    <div className="flex flex-col">
      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <a
          href="/sign-up"
          className="underline underline-offset-4 hover:text-primary"
        >
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default SignInFooter;
