import React from "react";
// import styled from 'styled-components'
// import { Link } from 'react-router-dom';
import Link from "next/link";

const Book = ({ book }) => {
  const { id, imageLinks, authors, title } = book;
  const author = getAuthorName(authors);

  return (
    <div className="book-2">
      <Link key={id} href={`/book/${id}`}>
        <div className="flex">
          <img
            src={imageLinks[0].smallThumbnail}
            className="book-image"
            alt="book"
          />
          <div className="book-info">
            <div className="book-title">{title}</div>
            <div className="book-author">{author}</div>
            {book.status === 0 ? (
              <div className="book-status read">
                <i className="fas fa-check"></i>
                Read
              </div>
            ) : book.status === 1 ? (
              <div className="book-status ip">
                <i className="fas fa-book-open"></i>
                In Progress
              </div>
            ) : (
              <div className="book-status unread">
                <i className="fas fa-book"></i>
                Unread
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Book;

const getAuthorName = (authorField) =>
  authorField?.length > 0
    ? authorField?.join(", ")
    : Array.isArray(authorField)
    ? authorField[0]
    : "No author";
