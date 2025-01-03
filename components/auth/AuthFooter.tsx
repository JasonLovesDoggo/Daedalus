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
      {showResetPassword && (
        <p className="text-center text-sm text-muted-foreground">
          Forgot your password?{" "}
          <a
            href="/forgot-password"
            className="font-medium text-primary transition-all hover:text-primary/80 hover:underline"
          >
            Reset Password
          </a>
        </p>
      )}
      {showContactUs && (
        <p className="text-center text-sm text-muted-foreground">
          Having trouble?{" "}
          <a
            href="/contact"
            className="font-medium text-primary transition-all hover:text-primary/80 hover:underline"
          >
            Contact Us
          </a>
        </p>
      )}
    </div>
  );
};

export default AuthFooter;
