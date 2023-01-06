import { Book } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import SectionsCardBook from "./SectionsCardBook";
import defaultImage from "../../public/static/img/shelfdecorations/leafy.png";

import robot from "../../public/static/img/robotbookend.png";
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
  const [direction, setDirection] = useState("left");
  console.log("section", section);

  return (
    <div
      className={sectionIsSelected ? "section selected" : "section"}
      onClick={() => setSelectedSection(section)}
    >
      <Droppable droppableId={section.id} direction="horizontal">
        {(provided, snapshot) => (
          <div
            className={`books 
            ${direction === "right" ? "right" : ""}`}
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
        <div className="section-title">{section.title}</div>
      </div>
      <div
        className={`section-label align-button flex ${
          sectionIsSelected ? "selected" : ""
        }`}
      >
        <div className="section-title" onClick={() => setDirection("left")}>
          <i className="fas fa-chevron-left"></i>
        </div>
        <div
          className="section-title"
          onClick={() => setDirection("right")}
          style={{
            borderLeft: "1px solid #aaa",
          }}
        >
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
    </div>
  );
};
export default BookcaseSection;
