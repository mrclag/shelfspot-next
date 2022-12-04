import { Book } from "@prisma/client";
import React from "react";
import SectionsCardBook from "./SectionsCardBook";

// type Props = {
//   books: Book[];
//   section
// };

const BookcaseSection = ({
  books,
  section,
  selectedSection,
  setSelectedSection,
}) => {
  const sectionBooks = books?.filter((book) => book.category === section.title);
  console.log("section books", sectionBooks);

  return (
    <div
      className={
        section?.title === selectedSection?.title
          ? "section selected"
          : "section"
      }
      onClick={() => setSelectedSection(section)}
    >
      <div className="books">
        {sectionBooks.map((book, i) => {
          return <SectionsCardBook key={i} book={book} />;
        })}
      </div>

      {/* Section label */}
      <div className="section-label">
        <span className="section-title">{section.title}</span>
        <div className="section-num-cards">{sectionBooks.length} books</div>
      </div>
    </div>
  );
};
export default BookcaseSection;
