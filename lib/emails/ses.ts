import { SES } from "@aws-sdk/client-ses";
import { render } from "@react-email/render";

const ses = new SES({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  react: React.ReactElement;
}

export const sendEmail = async ({ to, subject, react }: EmailOptions) => {
  const emailHtml = await render(react);

  const params = {
    Source: process.env.AWS_SES_VERIFIED_EMAIL || "",
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Html: {
          Data: emailHtml,
        },
      },
    },
  };

  try {
    await ses.sendEmail(params);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
