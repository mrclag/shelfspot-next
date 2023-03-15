import { Draggable } from "react-beautiful-dnd";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Book } from "@prisma/client";
import { Tooltip } from "react-tooltip";
import { getImageHeight, getImageWidth } from "../../utils/images";

const BookcaseBook = ({ book }) => {
  const { user } = useUser();
  const imageHeight = getImageHeight(book.imageLinks[0]?.smallThumbnail) + "px";
  const imageWidth = getImageWidth(book) + "px";

  const postBelongsToUser = user?.email === book.User?.email;

  // if (postBelongsToUser && book.hidden) return <div></div>;

  return (
    <>
      <Draggable
        key={book.id}
        index={book.orderIndex}
        draggableId={book.id}
        isDragDisabled={book.User?.email !== user?.email}
      >
        {(provided2) => {
          return (
            <>
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
              <Tooltip
                anchorId={book.id}
                place="bottom"
                variant="info"
                content="I'm a info tooltip"
              />
            </>
          );
        }}
      </Draggable>
    </>
  );
};

export default BookcaseBook;
