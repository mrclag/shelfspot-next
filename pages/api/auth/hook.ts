import  prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, imageUrl, name, secret } = req.body;

  // 1 validate the request is post
  if (req.method !== 'POST') {
    return res.status(403).json({ message: 'Method not allowed' });
  }
  // 2 validates the secret is correct
  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    return res.status(403).json({ message: `You must provide the secret 🤫` });
  }
  // 3 validate the email was provided in request body
  if (email) {
    // 4 create a new user record
    await prisma.user.create({
      data: { email, imageUrl, name },
    });
    
    await prisma.bookcase.create({
      data: {
        User: {connect: {email: email }},
        categories: {create: [{ title: 'Current' }]}
      }
    })

    return res.status(200).json({
      message: `User with email: ${email} has been created successfully!`,
    });
  }
};

export default handler;