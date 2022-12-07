import axios from 'axios';
import React from 'react';

const BookResult = ({ selectedSection, result }) => {
  const {
    authors,
    imageLinks,
    title,
  } = result.volumeInfo;

  const bookPicture = imageLinks
    ? imageLinks.smallThumbnail
    : 'https://picsum.photos/150';

  console.log(result.volumeInfo)

  const addBook = () => {
    const res = axios.post('/api/bookcase/addBook', {...result.volumeInfo})

  }

  const author = authors.length > 0 ? authors.join(', ') : authors[0]

  return (
    <div className='book-result'>
      <div className="book-content tooltip">
        <div className="book-img">
        <span className="tooltiptext">{title} by {author}</span>
          <img src={bookPicture} alt="Book result" />
        </div>
      </div>
      <button
        className="add-button"
        style={{ borderRadius: '5px' }}
        onClick={() => addBook(result)}
      >
        Add
      </button>
    </div>
  );
};



export default BookResult
