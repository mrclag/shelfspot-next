import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import BookcaseSection from "./BookcaseSection";
import SectionsCardBook from "./SectionsCardBook";
import toast, { Toaster } from "react-hot-toast";
import { DragDropContext } from "react-beautiful-dnd";

// import { swapBookend, bookends } from '../../utils/swapBookend';
// import {
//   addSection,
//   deleteSection,
//   // changeBookend,
// } from '../../actions/profile';
// import Modal from '../layout/Modal'
window["__react-beautiful-dnd-disable-dev-warnings"] = true;

const SectionsCard = ({
  bookcase,
  books,
  selectedSection,
  setSelectedSection,
  isUsers = true,
}) => {
  const [newSectionTitle, setNewSectionTitle] = useState("");

  const router = useRouter();

  const addSection = async (section) => {
    toast.promise(
      axios
        .post("/api/profile/addSection", {
          title: newSectionTitle,
          bookcaseId: bookcase.id,
        })
        .then((res) => {
          router.replace(router.asPath);
        }),
      {
        loading: "Adding shelf...",
        success: "Shelf added!",
        error: `Something went wrong 😥 Please try again`,
      }
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (newSectionTitle.length > 0) {
      addSection({ title: newSectionTitle });
      setNewSectionTitle("");
    }
  };

  const handleDragEnd = ({ destination, source /* draggableId */ }) => {
    console.log("DRAGGING");
  };

  const handleDragStart = (/*{ destination, source, draggableId }*/) => {};

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="sectionsCard">
        <div className="sections-title"></div>
        <div className="sections">
          {bookcase.categories?.map((section, i) => (
            <BookcaseSection
              section={section}
              books={books}
              setSelectedSection={setSelectedSection}
              selectedSection={selectedSection}
              sectionIndex={i}
            />
          ))}
          {isUsers && (
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
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

export default SectionsCard;
