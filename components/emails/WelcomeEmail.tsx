import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface WelcomeEmailProps {
  name: string;
  verificationCode: string;
  verificationUrl: string;
}

const WelcomeEmail = ({
  name,
  verificationCode,
  verificationUrl,
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        Welcome to Hack Canada! Your verification code: {verificationCode}
      </Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                primary: "#1E90FF",
                primaryDark: "#1565C0",
                background: "#FFFFFF",
                backgroundMuted: "#F8FAFC",
                textPrimary: "#1F2937",
                textSecondary: "#4B5563",
                textMuted: "#9CA3AF",
              },
            },
          },
        }}
      >
        <Body className="bg-backgroundMuted">
          <Container className="mx-auto max-w-[42rem] px-3 py-6">
            <Section className="rounded-lg bg-background p-6 shadow-sm">
              <Heading className="mb-4 text-2xl font-bold text-primary">
                Welcome, {name}!
              </Heading>
              <Text className="mt-4 text-textPrimary">
                Thank you for signing up. Please verify your email address using
                the code below:
              </Text>

              <Section className="mt-6 rounded-md bg-backgroundMuted p-4">
                <div className="text-center">
                  <Text className="text-textSecondary">
                    Your verification code is:
                  </Text>
                  <div className="mt-2 text-3xl font-bold tracking-wider text-primaryDark">
                    {verificationCode}
                  </div>
                  <Text className="mt-4 text-textSecondary">
                    Or click the button below to go to the verification page:
                  </Text>
                </div>
              </Section>

              <div className="mt-6 text-center">
                <Button
                  href={verificationUrl}
                  className="inline-block rounded-md bg-primary px-6 py-3 text-center font-bold text-white no-underline hover:bg-primaryDark"
                >
                  Verify Email
                </Button>
              </div>

              <Text className="mt-8 text-center text-textMuted">
                If you did not sign up for our platform, please ignore this
                email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
