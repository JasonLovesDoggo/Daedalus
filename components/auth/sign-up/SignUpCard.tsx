import AuthFooter from "../AuthFooter";
import SignUpForm from "./SignUpForm";
import SignUpHeader from "./SignUpHeader";

type Props = {};

const SignUpCard = ({}: Props) => {
  return (
    <div className="w-full space-y-4 rounded-md p-4 md:space-y-6">
      <SignUpHeader />
      <SignUpForm />
      <hr className="border-gray-300" />
      <AuthFooter
        showResetPassword={false}
        showContactUs={false}
        showSignUp={false}
      />
    </div>
  );
};

export default SignUpCard;
