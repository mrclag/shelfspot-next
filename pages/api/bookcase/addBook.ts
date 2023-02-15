import { getSession } from '@auth0/nextjs-auth0';
import { ContentState, convertToRaw } from 'draft-js';
import { getImageHeight, getCommonImgColor } from '../../../utils/images';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const newBook = req.body;
  const categoryId = req.body.categoryId;
  const bookcaseId = req.body.bookcaseId;
  const HIDDEN = false


  let color;
  const links = newBook.imageLinks;
  if (links && links.smallThumbnail) {
    const col = await getCommonImgColor(links.smallThumbnail);
    color = col || ['red'];
  }

  const imageHeight = getImageHeight(newBook.imageLinks[0]?.smallThumbnail);


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
      // heightMultiplier: imageHeight,
      hidden: HIDDEN,
      color,
      Category: { connect: { id: categoryId} },
      User: {connect: {email: session?.user?.email}},
      Bookcase: {connect: {id: bookcaseId}},
      userContent: JSON.stringify(convertToRaw(ContentState.createFromText('')))
    },
  });
  res.json(result);
}