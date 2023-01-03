import React from "react";
// import styled from 'styled-components'
// import { Link } from 'react-router-dom';
import Link from "next/link";

const Book2 = ({ book }) => {
  return (
    <div className="book-2">
      <Link key={book.id} href={`/book/${book.id}`}>
        <div className="flex">
          <img
            src={book.imageLinks[0].smallThumbnail}
            className="book-image"
            alt="book"
          />
          {/* <div className="book-info">{book.title}</div> */}
        </div>
      </Link>
    </div>
  );
};

export default Book2;
