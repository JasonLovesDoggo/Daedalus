import SignUpFooter from "./SignUpFooter";
import SignUpForm from "./SignUpForm";
import SignUpHeader from "./SignUpHeader";

type Props = {};

const SignUpCard = ({}: Props) => {
  return (
    <div className="w-full max-w-md space-y-8 rounded-md border p-6 md:p-10">
      <SignUpHeader />
      <SignUpForm />
      <SignUpFooter />
    </div>
  );
};

export default SignUpCard;
