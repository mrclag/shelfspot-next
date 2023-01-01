import React from "react";

const SectionsCardBook = ({ book }) => {
  let width;
  if (book && book.pageCount) {
    const num = Math.min(Math.max(book.pageCount / 7, 25), 45);
    width = num + "px";
  } else {
    width = "20px";
  }

  const bookImg = new Image();
  let bookImage = book.imageLinks[0]?.smallThumbnail;
  bookImg.src = bookImage;
  const bookImgHeight = bookImg.height;
  const bookImgWidth = bookImg.width;
  const ratio = bookImgHeight / bookImgWidth;
  const distFromOne = bookImgHeight > bookImgWidth ? ratio - 1 : 1 - ratio;
  const imageHeight = Math.max(Math.min(70 + distFromOne * 60, 120), 60) + "px";

  return (
    <div
      className="section-card-book"
      style={{ width: width, background: book.color[0], height: imageHeight }}
    ></div>
  );
};

export default SectionsCardBook;
