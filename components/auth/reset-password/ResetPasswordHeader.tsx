type Props = {};

const ResetPasswordHeader = ({}: Props) => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold">Reset Password</h1>
      <p className="text-sm text-muted-foreground">
        Please enter your new password.
      </p>
    </div>
  );
};

export default ResetPasswordHeader;
