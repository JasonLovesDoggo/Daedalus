type Props = {};

const ForgotPasswordHeader = ({}: Props) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Forgot Password</h1>
      <p className="text-sm text-muted-foreground">
        We will send you an email with the password reset link if the email is
        registered.
      </p>
    </div>
  );
};

export default ForgotPasswordHeader;
