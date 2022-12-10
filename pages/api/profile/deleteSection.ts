import { getSession } from '@auth0/nextjs-auth0';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { sectionId } = req.body;

  const session = await getSession(req, res);
  const result = await prisma.categories.delete({
    where: {
      id: sectionId
    },
  });
  res.json(result);
}