import React, { useState } from "react";
import axios from "axios";
import BookResult from "./BookResult";

const SearchBooks = ({ selectedSection }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultNum, setSearchResultNum] = useState(0);

  const fetchBooks = async () => {
    const result = await axios.get(`/api/googleBooks/${searchTerm}`);
    console.log(result);
    setSearchResultNum(result.data.totalItems);
    setSearchResult(result.data.items);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  return (
    <div className="search-books container">
      <div className="search-bar">
        <form onSubmit={(e) => onSubmitHandler(e)} className="search-form">
          <h2 className="search-title">Find Books for your Bookcase</h2>
          <input
            className="search-input"
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="search-button"
            style={{ borderRadius: "5px", marginLeft: "5px" }}
          >
            <i className="fas fa-search"></i>
          </button>
        </form>
        <form onSubmit={onSubmitHandler} />
      </div>
      <div>
        {searchResultNum > 0 && searchResultNum + " results (showing 10)"}{" "}
      </div>
      <div>
        {searchResult.length > 0 ? (
          <div className="book-results">
            {searchResult.map((result, i) => (
              <BookResult
                selectedSection={selectedSection}
                key={i}
                result={result}
              />
            ))}
          </div>
        ) : (
          <div className="bg-icon">
            {/* <i className="fas fa-book-medical"></i>
            <div className="bg-text">Search Books</div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBooks;
