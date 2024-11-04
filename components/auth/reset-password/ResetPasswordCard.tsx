import { ResetPasswordParamsProps } from "@/types/app";

import ResetPasswordForm from "./ResetPasswordForm";
import ResetPasswordHeader from "./ResetPasswordHeader";

const ResetPasswordCard = ({ params }: ResetPasswordParamsProps) => {
  return (
    <div className="w-full max-w-md space-y-8 rounded-md border p-6 md:p-10">
      <ResetPasswordHeader />
      <ResetPasswordForm params={params} />
    </div>
  );
};

export default ResetPasswordCard;
