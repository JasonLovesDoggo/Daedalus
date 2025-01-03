import AuthFooter from "../AuthFooter";
import SignInForm from "./SignInForm";
import SignInHeader from "./SignInHeader";

type Props = {};

const SignInCard = ({}: Props) => {
  return (
    <div className="w-full space-y-4 rounded-md p-4 md:space-y-6">
      <SignInHeader />
      <SignInForm />
      <hr className="border-gray-300" />
      <AuthFooter showSignIn={false} />
    </div>
  );
};

export default SignInCard;
