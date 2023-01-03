import { getSession } from '@auth0/nextjs-auth0';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const {searchValue, skip, take} = req.body

  if (req.method === 'POST') {

    const post = await prisma.user.findMany({
      where: {
        OR: [
          {
            email: {
              contains: searchValue
            }
          },
          { name: {
            contains: searchValue
          }}
        ]
      },
      skip,
      take,
      include: {
        books: {
          include: {
            Category: true,
          },
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