import React, { useEffect, useState } from "react";
import axios from "axios";
import BookResult from "./BookResult";
import SmallSpinner from "../layout/SmallSpinner";

// TODO:
// - This should be a panel, not a modal
//   that way it is easier to see books being added
//   will need to make context for modals

const SearchBooks = ({ bookcase, selectedCategory }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultNum, setSearchResultNum] = useState(0);
  const [page, setPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const maxResults = 15;

  const fetchBooks = async (searchTerm, page, maxResults) => {
    const result = await axios.post(`/api/googleBooks`, {
      searchTerm,
      page,
      maxResults,
    });
    setSearchResultNum(result.data.totalItems);
    setSearchResult(result.data.items);
  };

  const onSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    fetchBooks(searchTerm, page, maxResults);
  };

  const increasePage = async () => {
    setLoadingMore(true);
    await fetchBooks(searchTerm, page + 1, maxResults);
    setPage(page + 1);
    setLoadingMore(false);
  };

  const decrementPage = async () => {
    if (page > 0) {
      setLoadingMore(true);
      await fetchBooks(searchTerm, page - 1, maxResults);
      setPage(page - 1);
      setLoadingMore(false);
    }
  };
  const resultStart = page * maxResults + 1;

  return (
    <div className="search-books container">
      <form onSubmit={onSubmitHandler} className="search-form">
        <h2 className="search-title">Find Books for your Bookcase</h2>
        <div className="search-bar">
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
        </div>
      </form>
      <form onSubmit={onSubmitHandler} />
      {searchResult?.length > 0 && (
        <div className="search-bottom">
          <div className="flex-apart">
            <div className="num-results">
              {searchResultNum > 0 &&
                `Results ${resultStart} - ${resultStart + maxResults - 1}`}
              <div style={{ marginLeft: "10px" }}>
                {loadingMore && <SmallSpinner />}
              </div>
            </div>

            <div className="flex-center">
              <button
                disabled={page < 1 || loadingMore}
                onClick={decrementPage}
              >
                {"<"}
              </button>
              <button disabled={loadingMore} onClick={increasePage}>
                {">"}
              </button>
            </div>
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
