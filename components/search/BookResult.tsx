import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";

const BookResult = ({ categoryId, bookcaseId, result }) => {
  if (!result?.volumeInfo) return <div></div>;
  const { authors, imageLinks, title } = result.volumeInfo;
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const bookPicture = imageLinks
    ? imageLinks.smallThumbnail
    : "https://picsum.photos/150";

  const addBook = () => {
    setLoading(true);
    toast.promise(
      axios
        .post("/api/bookcase/addBook", {
          ...result.volumeInfo,
          categoryId,
          bookcaseId,
        })
        .then((res) => {
          router.replace(router.asPath);
          setLoading(false);
        }),
      {
        loading: "Adding to shelf...",
        success: "Book added! 🎉",
        error: `Something went wrong 😥 Please try again`,
      }
    );
  };

  const author =
    authors?.length > 0
      ? authors?.join(", ")
      : Array.isArray(authors)
      ? authors[0]
      : "No author";

  return (
    <div className="book-result">
      <div className="book-content tooltip">
        <div className="book-img">
          {/* <span className="tooltiptext">
            {title} by {author}
          </span> */}
          <img src={bookPicture} alt="Book result" />
        </div>
      </div>
      <div className="book-info">
        <div>
          <div className="book-title">{title}</div>
          <div className="book-author">{author}</div>
        </div>
        <button
          className={`add-button ${loading ? "disabled" : ""}`}
          disabled={loading}
          style={{ borderRadius: "5px" }}
          onClick={() => addBook()}
        >
          Add to Shelf
        </button>
      </div>
    </div>
  );
};

export default BookResult;
