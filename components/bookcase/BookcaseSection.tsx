import { Book } from "@prisma/client";
import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
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
  sectionIndex,
}) => {
  const sectionBooks = books?.filter((book) => book.categoryId === section.id);
  const sectionIsSelected = section?.title === selectedSection?.title;

  return (
    <div
      className={sectionIsSelected ? "section selected" : "section"}
      onClick={() => setSelectedSection(section)}
    >
      <Droppable droppableId={section.id} direction="horizontal">
        {(provided, snapshot) => (
          <div
            className="books"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {sectionBooks
              .sort((a, b) => a.orderIndex - b.orderIndex)
              .map((book, i) => {
                return <SectionsCardBook key={i} book={book} />;
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Section label */}
      <div className="section-label">
        <span className="section-title">{section.title}</span>
        <div className="section-num-cards">{sectionBooks.length} books</div>
      </div>
    </div>
  );
};
export default BookcaseSection;
