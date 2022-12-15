import { getSession } from '@auth0/nextjs-auth0';
import prisma from '../../../lib/prisma';


export default async function handle(req, res) {
  const { bookId } = req.body;


  const session = await getSession(req, res);
  const result = await prisma.book.delete({
    where: {
      id: bookId
    },
  });
  res.json(result);
}