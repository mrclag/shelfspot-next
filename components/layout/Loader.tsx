import React from "react";

type Props = {};

export const Loader = (props: Props) => {
  return (
    <div className="book-loader">
      <figure className="page"></figure>
      <figure className="page"></figure>
      <figure className="page"></figure>
    </div>
  );
};
