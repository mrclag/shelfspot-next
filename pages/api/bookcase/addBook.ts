import { getSession } from '@auth0/nextjs-auth0';
import { Book } from '@prisma/client';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, bookcaseId } = req.body;

  console.log(title, bookcaseId)

  const newBook: Book = {}

  const session = await getSession(req, res);
  const result = await prisma.book.create({
    data: {
      ...newBook
      Category: { connect: { id: categoryId} },
    },
  });
  res.json(result);
}