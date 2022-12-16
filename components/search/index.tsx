import React, { useState } from "react";
import axios from "axios";
import BookResult from "./BookResult";

const SearchBooks = ({ bookcase, selectedCategory }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultNum, setSearchResultNum] = useState(0);

  const fetchBooks = async () => {
    const result = await axios.post(`/api/googleBooks`, {
      searchTerm,
    });
    setSearchResultNum(result.data.totalItems);
    setSearchResult(result.data.items);
  };

  const onSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    fetchBooks();
  };

  return (
    <div className="search-books container">
      <div className="search-bar">
        <form onSubmit={onSubmitHandler} className="search-form">
          <h2 className="search-title">Find Books for your Bookcase</h2>
          <input
            className="search-input"
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </form>
        <form onSubmit={onSubmitHandler} />
      </div>
      {searchResult?.length > 0 && (
        <div className="search-bottom">
          <div className="num-results">
            {searchResultNum > 0 && searchResultNum + " results (showing 10)"}{" "}
          </div>
          <div className="book-results">
            {searchResult?.map((result, i) => (
              <BookResult
                categoryId={selectedCategory.id}
                bookcaseId={bookcase.id}
                key={i}
                result={result}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBooks;
