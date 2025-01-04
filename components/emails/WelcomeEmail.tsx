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

const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  name,
  verificationCode,
  verificationUrl,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Hack Canada! Please verify your email.</Preview>
      <Tailwind>
        <Body className="bg-backgroundMuted">
          <Container className="mx-auto max-w-2xl px-3 py-6">
            <Section className="rounded-lg bg-background p-6 shadow-md">
              <Heading className="mb-4 text-2xl font-bold text-primary">
                Welcome, {name}!
              </Heading>
              <Text className="mt-4 text-textPrimary">
                Thank you for signing up. Please verify your email address by
                clicking the button below.
              </Text>
              <Section className="mt-6 rounded-lg bg-backgroundMuted p-4">
                <Heading className="text-xl font-bold text-primaryDark">
                  Verification Code
                </Heading>
                <Text className="mt-2 text-textSecondary">
                  Your verification code is: <strong>{verificationCode}</strong>
                </Text>
              </Section>
              <Button
                href={verificationUrl}
                className="mt-6 rounded-md bg-primary px-4 py-2 font-bold text-white"
              >
                Verify Email
              </Button>
              <Text className="mt-8 text-textMuted">
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
