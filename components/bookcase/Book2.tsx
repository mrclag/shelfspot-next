import React from "react";
// import styled from 'styled-components'
// import { Link } from 'react-router-dom';
import Link from "next/link";

const Book2 = ({ book }) => {
  const { id, imageLinks, authors, title } = book;
  const author =
    authors?.length > 0
      ? authors?.join(", ")
      : Array.isArray(authors)
      ? authors[0]
      : "No author";

  const rand = Math.random();
  const progress = rand > 0.7 ? "IP" : rand > 0.3 ? "C" : "N";

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
            {progress === "C" ? (
              <div className="book-status read">
                <i className="fas fa-check"></i>
                Read
              </div>
            ) : progress === "IP" ? (
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

export default Book2;
