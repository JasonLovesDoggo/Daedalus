import ResetPasswordForm from "./ResetPasswordForm";
import ResetPasswordHeader from "./ResetPasswordHeader";

const ResetPasswordCard = ({ token }: { token: string }) => {
  return (
    <div className="w-full space-y-4 rounded-md p-4 md:space-y-6">
      <ResetPasswordHeader />
      <ResetPasswordForm token={token} />
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
          New to Hack Canada?{" "}
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

export default ResetPasswordCard;
