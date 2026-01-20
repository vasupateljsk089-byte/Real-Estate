import transporter from "@config/mailTransporter";

export interface SendMailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

interface SendMailResponse {
  success: true;
  messageId: string;
}

export const sendMail = async (
  options: SendMailOptions
): Promise<SendMailResponse> => {
  const { to, subject, html, text } = options;

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM as string,
      to,
      subject,
      text,
      html,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Email send error:", error);
    throw new Error("Email sending failed");
  }
};