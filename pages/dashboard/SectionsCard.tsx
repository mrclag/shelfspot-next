import React, { useState } from "react";
import BookcaseSection from "./BookcaseSection";
import SectionsCardBook from "./SectionsCardBook";
// import { swapBookend, bookends } from '../../utils/swapBookend';
// import {
//   addSection,
//   deleteSection,
//   // changeBookend,
// } from '../../actions/profile';
// import Modal from '../layout/Modal'

const SectionsCard = ({
  bookcase,
  books,
  selectedSection,
  setSelectedSection,
}) => {
  const [newSectionTitle, setNewSectionTitle] = useState("");

  const addSection = (section) => {};

  const onSubmit = (e) => {
    e.preventDefault();
    if (newSectionTitle.length > 0) {
      addSection({ title: newSectionTitle });
      setNewSectionTitle("");
    }
  };

  return (
    <div className="sectionsCard">
      <div className="sections-title"></div>
      <div className="sections">
        {bookcase.sections.map((section, i) => (
          <BookcaseSection
            section={section}
            books={books}
            setSelectedSection={setSelectedSection}
            selectedSection={selectedSection}
          />
        ))}
        <form
          onSubmit={(e) => onSubmit(e)}
          className="section bold"
          id="new-section"
        >
          <input
            type="text"
            className="new-section-input"
            placeholder="New Section"
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default SectionsCard;
