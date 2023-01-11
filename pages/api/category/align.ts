import { getSession } from '@auth0/nextjs-auth0';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { alignment, categoryId } = req.body;
  console.log('categoryId', categoryId)
  console.log('alignment', alignment)

  const result = await prisma.categories.update({
    where: {
      id: categoryId
    },
    data: {
      alignment: alignment
    },
  });
  res.json(result);
}