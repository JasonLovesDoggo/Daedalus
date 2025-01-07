import { SendEmailCommandInput, SES } from "@aws-sdk/client-ses";
import { render } from "@react-email/render";

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
): Promise<SendEmailResult> => {
  const params: SendEmailCommandInput = {
    Source: process.env.AWS_SES_VERIFIED_EMAIL || "",
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
          ? `https://app.hackcanada.org/email/verification?token=${token}`
          : `http://localhost:3000/email-verification?token=${token}`,
    }),
  );

  const result = await sendEmail(email, subject, body);

  return result;
};
