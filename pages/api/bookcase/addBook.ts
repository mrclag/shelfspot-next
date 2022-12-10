import { getSession } from '@auth0/nextjs-auth0';
import { Book } from '@prisma/client';
import prisma from '../../../lib/prisma';
import getCommonImgColor from '../../../utils/getCommonImgColor'

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const newBook = req.body;
  // const categoryId = 'clbbkzqbn0000pg0z6kdu0f65'
  const categoryId = req.body.categoryId;
  const bookcaseId = req.body.bookcaseId;
  const HIDDEN = false


  let color;
  const links = newBook.imageLinks;
  if (links && links.smallThumbnail) {
    const col = await getCommonImgColor(links.smallThumbnail);
    color = col || ['red'];
  }


  const session = await getSession(req, res);
  const result = await prisma.book.create({
    data: {
      title: newBook.title,
      authors: newBook.authors,
      imageLinks: newBook.imageLinks,
      pageCount: newBook.pageCount,
      industryIdentifiers: newBook.industryIdentifiers,
      description: newBook.description,
      subtitle: newBook.subtitle,
      hidden: HIDDEN,
      color,
      Category: { connect: { id: categoryId} },
      User: {connect: {email: session?.user?.email}},
      Bookcase: {connect: {id: bookcaseId}}
    },
  });
  res.json(result);
}