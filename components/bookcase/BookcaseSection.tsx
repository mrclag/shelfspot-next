import { Book } from "@prisma/client";
import React from "react";
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

  return (
    <div
      className={
        section?.title === selectedSection?.title
          ? "section selected"
          : "section"
      }
      onClick={() => setSelectedSection(section)}
    >
      <Droppable droppableId={sectionIndex} direction="horizontal">
        {(provided, snapshot) => (
          <div
            className="books"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {sectionBooks.map((book, i) => {
              return (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <SectionsCardBook key={i} book={book} provided={provided} />
                </div>
              );
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
