import { SendEmailCommandInput, SES } from "@aws-sdk/client-ses";
import { render } from "@react-email/render";

import ApplicationSubmittedEmail from "@/components/emails/ApplicationSubmittedEmail";
import ResetPasswordEmail from "@/components/emails/ResetPasswordEmail";
import WelcomeEmail from "@/components/emails/WelcomeEmail";

const ses = new SES({
  region: process.env.AWS_SES_REGION,
  credentials: {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY || "",
  },
});

type SendEmailResult = {
  success: boolean;
  error?: string;
};

export const sendEmail = async (
  to: string,
  subject: string,
  body: string,
  from?: string,
): Promise<SendEmailResult> => {
  const params: SendEmailCommandInput = {
    Source: from || process.env.AWS_SES_VERIFIED_EMAIL || "",
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: body,
        },
        Text: {
          Charset: "UTF-8",
          Data: body.replace(/<[^>]+>/g, ""),
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
  };

  try {
    await ses.sendEmail(params);
    return { success: true };
  } catch (error) {
    console.error("Error sending email with SES:", error);
    return {
      success: false,
      error: "Something went wrong. Email could not be sent.",
    };
  }
};

type WelcomeEmailProps = {
  name: string;
  email: string;
  subject: string;
  verificationCode: string;
  token: string;
};

export const sendWelcomeEmail = async (data: WelcomeEmailProps) => {
  const { name, email, subject, verificationCode, token } = data;

  const body = await render(
    WelcomeEmail({
      name,
      verificationCode,
      verificationUrl:
        process.env.NODE_ENV === "production"
          ? `https://app.hackcanada.org/email-verification?token=${token}`
          : `http://localhost:3000/email-verification?token=${token}`,
    }),
  );

  const result = await sendEmail(
    email,
    subject,
    body,
    process.env.AWS_SES_NO_REPLY_EMAIL,
  );

  return result;
};

type ResetPasswordEmailProps = {
  name: string;
  email: string;
  subject: string;
  token: string;
};

export const sendResetPasswordEmail = async (data: ResetPasswordEmailProps) => {
  const { name, email, subject, token } = data;

  const resetUrl =
    process.env.NODE_ENV === "production"
      ? `https://app.hackcanada.org/reset-password/${token}`
      : `http://localhost:3000/reset-password/${token}`;

  const body = await render(
    ResetPasswordEmail({
      name,
      resetUrl,
    }),
  );

  const result = await sendEmail(
    email,
    subject,
    body,
    process.env.AWS_SES_NO_REPLY_EMAIL,
  );

  return result;
};

type ApplicationSubmittedEmailProps = {
  name: string;
  email: string;
  subject: string;
};

export const sendApplicationSubmittedEmail = async (
  data: ApplicationSubmittedEmailProps,
) => {
  const { name, email, subject } = data;

  const body = await render(
    ApplicationSubmittedEmail({
      name,
    }),
  );

  const result = await sendEmail(
    email,
    subject,
    body,
    process.env.AWS_SES_NO_REPLY_EMAIL,
  );

  return result;
};
