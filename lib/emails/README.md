# Email Configuration

This directory contains the email configuration for the application.

## `ses.ts`

This file contains the `sendEmail` function, which is used to send emails using AWS SES and React Email templates.

### `sendEmail` Function

The `sendEmail` function is an asynchronous function that takes an object with the following properties:

- `to`: The email address of the recipient.
- `subject`: The subject of the email.
- `react`: A React element representing the email template.

```typescript
interface EmailOptions {
  to: string;
  subject: string;
  react: React.ReactElement;
}

export const sendEmail = async ({ to, subject, react }: EmailOptions) => {
  // ...
};
```

**Example Usage:**

```typescript
import { sendEmail } from "./email";
import WelcomeEmail from "./emails/WelcomeEmail";

const sendWelcomeEmail = async (userEmail: string, userName: string, verificationCode: string, verificationUrl: string) => {
  try {
    await sendEmail({
      to: userEmail,
      subject: "Welcome to our platform!",
      react: <WelcomeEmail name={userName} verificationCode={verificationCode} verificationUrl={verificationUrl} />,
    });
    console.log("Welcome email sent successfully!");
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
};
```

## `components/emails` Directory

This directory contains the React Email templates. Each file in this directory should export a React component that can be used as an email template.

**Example:**

See `WelcomeEmail.tsx` for an example of an email template.

## Environment Variables

The following environment variables are required for the `sendEmail` function to work:

- `AWS_REGION`: The AWS region to use for SES.
- `AWS_ACCESS_KEY_ID`: The AWS access key ID.
- `AWS_SECRET_ACCESS_KEY`: The AWS secret access key.
- `EMAIL_FROM_ADDRESS`: The email address to use as the sender.

Make sure these environment variables are set in your `.env` file or in your environment.
