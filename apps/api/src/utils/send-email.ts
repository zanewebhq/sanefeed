import { faker } from '@faker-js/faker';
import nodemailer from 'nodemailer';

interface SendEmailOptions {
  email: string;
  subject: string;
  text: string;
}

const sendEmail = async (options: SendEmailOptions) => {
  const randomName = faker.person.fullName();
  const randomEmail = faker.internet.email();

  nodemailer.createTestAccount(async (err, account) => {
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    await transporter
      .sendMail({
        from: `${randomName} <${randomEmail}>`,
        to: options.email,
        subject: options.subject,
        text: options.text,
      })
      .then((info) => {
        console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
      });
  });
};

export default sendEmail;
