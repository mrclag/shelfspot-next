import { Droppable, Draggable } from "react-beautiful-dnd";
import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

const SectionsCardBook = ({ book }) => {
  const { user } = useUser();

  const router = useRouter();
  const { id } = router.query;

  let width;
  if (book && book.pageCount) {
    const num = Math.min(Math.max(book.pageCount / 7, 25), 45);
    width = num + "px";
  } else {
    width = "20px";
  }

  const bookImg = new Image();
  let bookImage = book.imageLinks[0]?.smallThumbnail;
  bookImg.src = bookImage;
  const bookImgHeight = bookImg.height;
  const bookImgWidth = bookImg.width;
  const ratio = bookImgHeight / bookImgWidth;
  const distFromOne = bookImgHeight > bookImgWidth ? ratio - 1 : 1 - ratio;
  const imageHeight = Math.max(Math.min(70 + distFromOne * 60, 120), 60) + "px";
  console.log(book);
  return (
    <Draggable
      key={book.id}
      index={book.orderIndex}
      draggableId={book.id}
      isDragDisabled={book.User?.email === user?.email}
    >
      {(provided2, snapshot) => {
        return (
          <div
            ref={provided2.innerRef}
            {...provided2.draggableProps}
            {...provided2.dragHandleProps}
          >
            <div
              className="flex-col"
              style={{
                height: "100%",
                position: "relative",
                display: "flex",
                alignContent: "flex-end",
                flexDirection: "column",
                marginRight: "auto",
              }}
            >
              <div
                className="section-card-book"
                style={{
                  width: width,
                  background: book.color[0],
                  height: imageHeight,
                }}
              ></div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default SectionsCardBook;
