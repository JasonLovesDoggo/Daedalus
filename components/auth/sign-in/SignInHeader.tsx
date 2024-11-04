import AuthProviders from "../AuthProviders";

type Props = {};

const SignInHeader = ({}: Props) => {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="text-sm text-muted-foreground">
          to continue to Hack Canada
        </p>
      </div>
      <AuthProviders />
    </div>
  );
};

export default SignInHeader;
