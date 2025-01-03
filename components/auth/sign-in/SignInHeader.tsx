type Props = {};

const SignInHeader = ({}: Props) => {
  return (
    <div>
      <h1 className="font-rubik text-2xl font-bold md:text-3xl">Sign In</h1>
      <p className="text-muted-foreground max-md:text-sm">
        to continue to Hack Canada
      </p>
    </div>
  );
};

export default SignInHeader;
