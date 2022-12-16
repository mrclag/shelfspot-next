import { getSession } from '@auth0/nextjs-auth0';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { bookId, content, rating } = req.body;


  const session = await getSession(req, res);
  const result = await prisma.book.update({
    where: {
      id: bookId
    },
    data: {
      userContent: content,
      rating,
    },
  });
  res.json(result);
}