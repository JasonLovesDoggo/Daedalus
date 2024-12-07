import ResetPasswordForm from "./ResetPasswordForm";
import ResetPasswordHeader from "./ResetPasswordHeader";

const ResetPasswordCard = ({ token }: { token: string }) => {
  return (
    <div className="w-full max-w-md space-y-4 rounded-md border p-6 md:p-10">
      <ResetPasswordHeader />
      <ResetPasswordForm token={token} />
    </div>
  );
};

export default ResetPasswordCard;
