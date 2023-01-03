import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import BookcaseSection from "./BookcaseSection";
import SectionsCardBook from "./SectionsCardBook";
import toast, { Toaster } from "react-hot-toast";
import { DragDropContext } from "react-beautiful-dnd";
import { Book } from "@prisma/client";
import prisma from "../../lib/prisma";

// import { swapBookend, bookends } from '../../utils/swapBookend';
// import {
//   addSection,
//   deleteSection,
//   // changeBookend,
// } from '../../actions/profile';
// import Modal from '../layout/Modal'
window["__react-beautiful-dnd-disable-dev-warnings"] = true;

// a little function to help us with reordering the result
const reorder = (list: Book[], source, destination) => {
  const destId = destination.droppableId;
  const sourceId = source.droppableId;
  const newValues = {};

  console.log("source", source);
  console.log("destination", destination);

  if (sourceId === destId) {
    const sourceBooks = Array.from(
      list.filter((book) => book.categoryId === sourceId)
    );

    const [removed] = sourceBooks.splice(source.index, 1);
    sourceBooks.splice(destination.index, 0, removed);

    // @ts-ignore
    const sourceWithIndexes = sourceBooks.map((book, i) => ({
      ...book,
      orderIndex: i,
    }));
    const newList = list
      .filter((book) => book.categoryId !== sourceId)
      .concat(...sourceWithIndexes);

    // const res = await axios.post("/api/bookcase/updateIndex", {
    //   sourceWithIndexes,
    //   destinationBooks: null,
    // });

    return newList;
  } else if (sourceId !== destId) {
    const sourceBooks = Array.from(
      list.filter((book) => book.categoryId === sourceId)
    );
    const destBooks = Array.from(
      list.filter((book) => book.categoryId === destId)
    );

    const [removed] = sourceBooks.splice(source.index, 1);
    destBooks.splice(destination.index, 0, removed);

    const sourceWithIndexes = sourceBooks.map((book, i) => ({
      ...book,
      orderIndex: i,
    }));

    const destWithIndexes = destBooks.map((book, i) => ({
      ...book,
      orderIndex: i,
      categoryId: destId,
    }));

    const newList = list
      .filter(
        (book) => book.categoryId !== sourceId && book.categoryId !== destId
      )
      .concat(...sourceWithIndexes, destWithIndexes);

    return newList;
  }
};

const Bookcase = ({
  bookcase,
  books: initialBooks,
  selectedSection,
  setSelectedSection,
  isUsers = true,
}) => {
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [books, setBooks] = useState(initialBooks);
  console.log(books);

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

  const handleDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems = reorder(books, result.source, result.destination);
    console.log("newitems", newItems);
    setBooks(newItems);
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

export default Bookcase;
