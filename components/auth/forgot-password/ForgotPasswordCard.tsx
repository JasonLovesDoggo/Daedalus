import ForgotPasswordForm from "./ForgotPasswordForm";
import ForgotPasswordHeader from "./ForgotPasswordHeader";

type Props = {};

const ForgotPasswordCard = ({}: Props) => {
  return (
    <div className="w-full max-w-md space-y-8 rounded-md border p-6 md:p-10">
      <ForgotPasswordHeader />
      <ForgotPasswordForm />
      <hr />
      <div className="flex flex-col">
        <p className="text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <a
            href="/sign-in"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign In
          </a>
        </p>
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
    </div>
  );
};

export default ForgotPasswordCard;
