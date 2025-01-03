import AuthFooter from "../AuthFooter";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ForgotPasswordHeader from "./ForgotPasswordHeader";

type Props = {};

const ForgotPasswordCard = ({}: Props) => {
  return (
    <div className="w-full space-y-4 rounded-md p-4 md:space-y-6">
      <ForgotPasswordHeader />
      <ForgotPasswordForm />
      <hr />
      <AuthFooter showResetPassword={false} />
    </div>
  );
};

export default ForgotPasswordCard;
