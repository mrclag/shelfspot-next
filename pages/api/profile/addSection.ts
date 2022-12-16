import { getSession } from '@auth0/nextjs-auth0';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, bookcaseId } = req.body;

  const session = await getSession(req, res);
  const result = await prisma.categories.create({
    data: {
      title: title,
      Bookcase: { connect: { id: bookcaseId} },
    },
  });
  res.json(result);
}