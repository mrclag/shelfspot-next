import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import BookcaseBook from "./BookcaseBook";
import axios from "axios";
import SmallSpinner from "../layout/SmallSpinner";

// TODO:
// put bookcase into context

const BookcaseSection = ({
  books,
  section,
  selectedSection,
  setSelectedSection,
  sectionIndex,
}) => {
  const sectionBooks = books?.filter((book) => book.categoryId === section.id);
  const sectionIsSelected = section?.title === selectedSection?.title;
  const [direction, setDirection] = useState(section.alignment);
  const [loadingAlign, setLoadingAlign] = useState(false);

  const selectAlignment = async (val: "left" | "right") => {
    if (loadingAlign) return;
    setLoadingAlign(true);
    await axios.post(`/api/category/align`, {
      categoryId: section.id,
      alignment: val,
    });
    setLoadingAlign(false);

    setDirection(val);
  };

  return (
    <div
      className={sectionIsSelected ? "section selected" : "section"}
      onClick={() => setSelectedSection(section)}
    >
      <Droppable droppableId={section.id} direction="horizontal">
        {(provided) => (
          <div
            className={`books 
            ${direction === "right" ? "right" : "left"}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {sectionBooks
              .sort((a, b) => a.orderIndex - b.orderIndex)
              .map((book, i) => {
                return <BookcaseBook key={i} book={book} />;
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Section label */}
      <div className={`section-label`}>
        <div className="section-title">{section.title} </div>
      </div>
      <div
        className={`section-label align-button flex ${
          sectionIsSelected ? "selected" : ""
        } ${loadingAlign ? "disabled" : ""}`}
      >
        {loadingAlign ? (
          <div className="section-title">
            <SmallSpinner style="left" />
          </div>
        ) : direction === "right" ? (
          <div
            className="section-title"
            onClick={() => selectAlignment("left")}
          >
            <i className="fas fa-arrow-left"></i>
          </div>
        ) : (
          <div
            className="section-title"
            onClick={() => selectAlignment("right")}
          >
            <i className="fas fa-arrow-right"></i>
          </div>
        )}
      </div>
    </div>
  );
};
export default BookcaseSection;
