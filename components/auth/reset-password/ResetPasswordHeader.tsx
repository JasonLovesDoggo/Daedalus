type Props = {};

const ResetPasswordHeader = ({}: Props) => {
  return (
    <div>
      <h1 className="font-rubik text-2xl font-semibold md:text-3xl">
        Reset Password
      </h1>
      <p className="text-gray-500 max-md:text-sm">
        Please enter your new password.
      </p>
    </div>
  );
};

export default ResetPasswordHeader;
