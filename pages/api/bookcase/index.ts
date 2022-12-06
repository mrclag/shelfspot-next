import { getSession } from '@auth0/nextjs-auth0';
import prisma from '../../../lib/prisma';


export default async function handle(req, res) {
  const postId = req.query.id;
  if (req.method === 'GET') {
    const session = await getSession( req, res );

    const post = await prisma.bookcase.findMany({
      where: {
        User: { email: session.user.email },
      },
      include: {
        User: {
          select: { name: true },
        },
      },
    });

    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}