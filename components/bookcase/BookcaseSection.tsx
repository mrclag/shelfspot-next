import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import SectionsCardBook from "./SectionsCardBook";
import axios from "axios";
import SmallSpinner from "../layout/SmallSpinner";
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
  const [direction, setDirection] = useState(section.alignment);
  console.log("section", section);
  const [loadingAlign, setLoadingAlign] = useState(false);

  const selectAlignment = async (val) => {
    setLoadingAlign(true);
    const res = await axios.post(`/api/category/align`, {
      categoryId: selectedSection.id,
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
        {(provided, snapshot) => (
          <div
            className={`books 
            ${direction === "right" ? "right" : "left"}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {sectionBooks
              .sort((a, b) => a.orderIndex - b.orderIndex)
              .map((book, i) => {
                return <SectionsCardBook key={i} book={book} />;
              })}
            {provided.placeholder}
            {/* <div
              className={`bookend ${direction === "right" ? "flipped" : ""}`}
            >
              <Image src={robot} alt="" width="100px" height="100px" />
            </div> */}
          </div>
        )}
      </Droppable>

      {/* Section label */}
      <div className={`section-label`}>
        <div className="section-title">{section.title} </div>
      </div>
      {loadingAlign && <SmallSpinner />}
      <div
        className={`section-label align-button flex ${
          sectionIsSelected ? "selected" : ""
        }`}
      >
        <div className="section-title" onClick={() => selectAlignment("left")}>
          <i className="fas fa-chevron-left"></i>
        </div>
        <div
          className="section-title"
          onClick={() => selectAlignment("right")}
          style={{
            borderLeft: "1px solid #aaa",
            cursor: "pointer",
          }}
        >
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
    </div>
  );
};
export default BookcaseSection;
