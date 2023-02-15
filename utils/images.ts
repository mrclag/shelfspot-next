import { Book } from '@prisma/client';
import ColorThief from 'colorthief'
import lightOrDark from './lightOrDark';

export const getCommonImgColor = async (imgUrl) => {
  const color = await ColorThief.getColor(imgUrl)
    .then((color) => {
      return 'rgb(' + color.join(',') + ')';
    })
    .catch((err) => {
      console.log(err);
    });
  return [color, lightOrDark(color)];
};


export const getImageHeight = (bookImage) => {
  const bookImg = new Image();
  bookImg.src = bookImage;
  const bookImgHeight = bookImg.height;
  const bookImgWidth = bookImg.width;
  const ratio = bookImgHeight / bookImgWidth;
  const distFromOne = bookImgHeight > bookImgWidth ? ratio - 1 : 1 - ratio;
  // the max image height is 120, min height is 60
  // height = 70 (default height) + # * multiplier

  const imageHeight = Math.max(Math.min(70 + distFromOne * 60, 120), 60);

  return imageHeight;
};

export const getImageWidth = (book: Book) => {
  let width;
  if (book && book.pageCount) {
    const num = Math.min(Math.max(book.pageCount / 7, 25), 45);
    width = num + "px";
  } else {
    width = "20px";
  }

  return width;
};
