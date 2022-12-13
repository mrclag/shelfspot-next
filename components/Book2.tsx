import React from 'react'
// import styled from 'styled-components'
// import { Link } from 'react-router-dom';
import Link from 'next/link'

const Book2 = ({book, profile}) => {
  return (
    <div className='book-2'>
      <Link
        key={book._id}
        href={`/profile/book/${profile.user._id}/${book._id}`}
      >
      <img src={book.imageLinks[0].smallThumbnail} className='book-image' alt='book'/>
      </Link>
    </div>
  )
}


export default Book2
