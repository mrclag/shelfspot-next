import { Draggable } from "react-beautiful-dnd";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Book } from "@prisma/client";

const BookcaseBook = ({ book }) => {
  const { user } = useUser();
  const imageHeight = getImageHeight(book.imageLinks[0]?.smallThumbnail) + "px";
  const imageWidth = getImageWidth(book);

  return (
    <Draggable
      key={book.id}
      index={book.orderIndex}
      draggableId={book.id}
      isDragDisabled={book.User?.email === user?.email}
    >
      {(provided2) => {
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
                  width: imageWidth,
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

export default BookcaseBook;

export const getImageHeight = (bookImage) => {
  const bookImg = new Image();
  bookImg.src = bookImage;
  const bookImgHeight = bookImg.height;
  const bookImgWidth = bookImg.width;
  const ratio = bookImgHeight / bookImgWidth;
  const distFromOne = bookImgHeight > bookImgWidth ? ratio - 1 : 1 - ratio;
  // the max image height is 120, min height is 60
  // height = 70 (default height) + # * multiplier

  const imageHeight = Math.max(Math.min(70 + distFromOne * 60, 120), 60);

  return imageHeight;
};

export const getImageWidth = (book: Book) => {
  let width;
  if (book && book.pageCount) {
    const num = Math.min(Math.max(book.pageCount / 7, 25), 45);
    width = num + "px";
  } else {
    width = "20px";
  }

  return width;
};
