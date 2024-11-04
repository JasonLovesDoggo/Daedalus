import AuthProviders from "../AuthProviders";

type Props = {};
const SignUpHeader = ({}: Props) => {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-sm text-muted-foreground">
          to get started with Hack Canada
        </p>
      </div>
      <AuthProviders />
    </div>
  );
};
export default SignUpHeader;
