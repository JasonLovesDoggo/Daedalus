import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import ResetPasswordCard from "@/components/auth/reset-password/ResetPasswordCard";

const ResetPasswordPage = ({
  params,
}: {
  params: {
    token: string;
  };
}) => {
  return (
    <div className="flex min-h-svh items-center justify-center px-4">
      <ResetPasswordCard token={params.token} />
    </div>
  );
};

export default ResetPasswordPage;
