import React from "react";

const SectionsCardBook = ({ book }) => {
  let width;
  if (book && book.pageCount) {
    const num = Math.min(Math.max(book.pageCount / 7, 25), 60);
    width = num + "px";
  } else {
    width = "20px";
  }

  // let height = Math.random() * 40 + 70;

  return (
    <div
      className="section-card-book"
      style={{ width: width, background: book.color[0] }}
    ></div>
  );
};

export default SectionsCardBook;
