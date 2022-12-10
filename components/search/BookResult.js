import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';

const BookResult = ({ categoryId, bookcaseId, result }) => {
  if(!result?.volumeInfo) return <div></div>
  const {
    authors,
    imageLinks,
    title,
  } = result.volumeInfo;

  const router = useRouter()

  const bookPicture = imageLinks
    ? imageLinks.smallThumbnail
    : 'https://picsum.photos/150';

  const addBook = () => {
    const res = axios.post('/api/bookcase/addBook', {...result.volumeInfo, categoryId, bookcaseId}).then(res => {
      console.log('refreshing')
      router.replace(router.asPath)
    })

  }

  const author = authors?.length > 0 ? authors?.join(', ') : Array.isArray(authors) ? authors[0] : author ? author : 'No author'

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
