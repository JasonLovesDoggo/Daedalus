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

interface ResetPasswordEmailProps {
  name: string;
  resetUrl: string;
}

const ResetPasswordEmail = ({ name, resetUrl }: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your Hack Canada password</Preview>
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
                Password Reset Request
              </Heading>
              <Text className="mt-4 text-textPrimary">
                Hi {name}, we received a request to reset your Hack Canada
                password.
              </Text>

              <Section className="mt-6 rounded-md bg-backgroundMuted p-4">
                <div className="text-center">
                  <Text className="text-textSecondary">
                    Click the button below to reset your password:
                  </Text>
                </div>
              </Section>

              <div className="mt-6 text-center">
                <Button
                  href={resetUrl}
                  className="inline-block rounded-md bg-primary px-6 py-3 text-center font-bold text-white no-underline hover:bg-primaryDark"
                >
                  Reset Password
                </Button>
              </div>

              <Text className="mt-8 text-center text-textMuted">
                If you didn't request this password reset, please ignore this
                email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPasswordEmail;
