'use server';

import { createTransport } from 'nodemailer';

import { getUserByEmail } from '@/data/users';

// get user from https://ethereal.email/
const emailUser = {
  name: 'Lucas Ankunding',
  authData: {
    user: 'lucas.ankunding90@ethereal.email',
    pass: 'FRsPFszPJRSnsbmmSS',
  },
};

const transporter = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: emailUser.authData,
});

export const sendEmailNotificationToUser = async (email: string) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      throw new Error("the user doesn't exist.");
    }

    await transporter.sendMail({
      from: `"${emailUser.name}" <${emailUser.authData.user}>`,
      to: email,
      subject: 'New Task',
      html: `
          <div>
            <h1>Hello ${user.firstName} ${user.lastName}!</h1>
              <p>You have a new task assigned to you in Meditask Manager.<p>
          </div>
        `,
    });
  } catch (error) {
    console.error('Error sending email notification.', error);
    throw error;
  }
};
