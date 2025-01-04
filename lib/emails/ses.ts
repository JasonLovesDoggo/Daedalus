import { SendEmailCommandInput, SES } from "@aws-sdk/client-ses";
import { render } from "@react-email/render";

import WelcomeEmail from "@/components/emails/WelcomeEmail";

const ses = new SES({ region: process.env.AWS_SES_REGION });

export const sendEmail = async (to: string, subject: string, body: string) => {
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
    return { error: "Something went wrong. Email could not be sent." };
  }
};

export const sendWelcomeEmail = async (
  name: string,
  subject: string,
  email: string,
) => {
  const body = await render(
    WelcomeEmail({
      name,
      verificationCode: "123456",
      verificationUrl: "https://google.com",
    }),
  );

  const result = await sendEmail(email, subject, body);

  return result;
};
