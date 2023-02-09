import prisma from '../../../lib/prisma';

// POST /api/bookcase/saveBook

export default async function handle(req, res) {
  const { bookId, content, rating } = req.body;

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