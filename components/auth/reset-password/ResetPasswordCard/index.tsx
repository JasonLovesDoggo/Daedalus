import ResetPasswordForm from "../ResetPasswordForm";
import ResetPasswordHeader from "../ResetPasswordHeader";

type Props = {};

const ResetPasswordCard = ({}: Props) => {
  return (
    <div className="w-full max-w-md space-y-8 rounded-md border p-6 md:p-10">
      <ResetPasswordHeader />
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordCard;
