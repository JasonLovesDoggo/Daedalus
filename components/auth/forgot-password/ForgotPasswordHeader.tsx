type Props = {};

const ForgotPasswordHeader = ({}: Props) => {
  return (
    <div>
      <h1 className="font-rubik text-2xl font-semibold text-white md:text-3xl">
        Forgot Password
      </h1>
      <p className="text-white/75 max-md:text-sm">
        We will send you an email with the password reset link if the email is
        registered.
      </p>
    </div>
  );
};

export default ForgotPasswordHeader;
