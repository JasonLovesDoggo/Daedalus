import ForgotPasswordForm from "./ForgotPasswordForm";
import ForgotPasswordHeader from "./ForgotPasswordHeader";

type Props = {};

const ForgotPasswordCard = ({}: Props) => {
  return (
    <div className="w-full max-w-md space-y-4 rounded-md border p-6 md:p-10">
      <ForgotPasswordHeader />
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordCard;
