import { getSession } from '@auth0/nextjs-auth0';
import prisma from '../../../lib/prisma';

// POST /api/bookcase/saveBook

export default async function handle(req, res) {
  const { sourceBooks, destinationBooks } = req.body;
  
  try {

    for (let i = 0; i < sourceBooks.length; i++) {
      await prisma.book.update({
        where: {
          id: sourceBooks[i].id,
        },
        data: {
          orderIndex: i,
        },
      });
    }

    

  } catch (error) {
    console.log(error)
  }

}