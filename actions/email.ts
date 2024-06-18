'use server';

import { createTransport } from 'nodemailer';

import { getUserByEmail } from '@/data/users';

const emailUser = {
  name: 'Randal Auer',
  authData: {
    user: 'randal.auer58@ethereal.email',
    pass: 'WYpBpsyGpRDnqzxPZw',
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
      html: '<b>Hello world?</b>',
    });
  } catch (error) {
    console.error('Error sending email notification.', error);
    throw error;
  }
};
