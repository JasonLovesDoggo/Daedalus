import SignInFooter from "./SignInFooter";
import SignInForm from "./SignInForm";
import SignInHeader from "./SignInHeader";

type Props = {};

const SignInCard = ({}: Props) => {
  return (
    <div className="w-full max-w-md space-y-8 rounded-md border p-6 md:p-10">
      <SignInHeader />
      <SignInForm />
      <hr />
      <SignInFooter />
    </div>
  );
};

export default SignInCard;
