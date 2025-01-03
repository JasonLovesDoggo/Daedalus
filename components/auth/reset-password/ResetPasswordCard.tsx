import AuthFooter from "../AuthFooter";
import ResetPasswordForm from "./ResetPasswordForm";
import ResetPasswordHeader from "./ResetPasswordHeader";

const ResetPasswordCard = ({ token }: { token: string }) => {
  return (
    <div className="w-full space-y-4 rounded-md p-4 md:space-y-6">
      <ResetPasswordHeader />
      <ResetPasswordForm token={token} />
      <hr />
      <AuthFooter showResetPassword={false} />
    </div>
  );
};

export default ResetPasswordCard;
