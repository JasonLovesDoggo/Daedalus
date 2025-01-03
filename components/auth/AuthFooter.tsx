type Props = {
  showSignIn?: boolean;
  showSignUp?: boolean;
  showResetPassword?: boolean;
  showContactUs?: boolean;
};

const AuthFooter = ({
  showSignIn = true,
  showSignUp = true,
  showResetPassword = true,
  showContactUs = true,
}: Props) => {
  return (
    <div className="flex flex-col space-y-3">
      {showSignIn && (
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a
            href="/sign-in"
            className="font-medium text-primary transition-all hover:text-primary/80 hover:underline"
          >
            Sign In
          </a>
        </p>
      )}
      {showSignUp && (
        <p className="text-center text-sm text-muted-foreground">
          New to Hack Canada?{" "}
          <a
            href="/sign-up"
            className="font-medium text-primary transition-all hover:text-primary/80 hover:underline"
          >
            Sign Up
          </a>
        </p>
      )}
      <div className="flex items-center justify-around">
        {showResetPassword && (
          <a
            href="/forgot-password"
            className="text-center text-sm font-medium text-primary transition-all hover:text-primary/80 hover:underline"
          >
            Forgot your password?
          </a>
        )}
        {showContactUs && (
          <a
            href="mailto:admin@hackcanada.org"
            target="_blank"
            className="text-right text-sm font-medium text-primary transition-all hover:text-primary/80 hover:underline"
          >
            Having trouble?
          </a>
        )}
      </div>
    </div>
  );
};

export default AuthFooter;
