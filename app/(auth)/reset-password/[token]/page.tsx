import ResetPasswordCard from "@/components/auth/reset-password/ResetPasswordCard";

const ResetPasswordPage = ({
  params,
}: {
  params: {
    token: string;
  };
}) => {
  return <ResetPasswordCard token={params.token} />;
};

export default ResetPasswordPage;
