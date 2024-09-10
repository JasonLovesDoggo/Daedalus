import SignInFooter from "../SignInFooter";
import SignInForm from "../SignInForm";

type Props = {};

const SignInCard = ({}: Props) => {
  return (
    <div className="w-full max-w-md space-y-8 rounded-md border p-6 md:p-10">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <SignInForm />
      <hr />
      <SignInFooter />
    </div>
  );
};

export default SignInCard;
