import Image from "next/image";
import React from "react";
import loader from "../../public/static/icons/book-loader.gif";

type Props = {};

export const Loader = (props: Props) => {
  return (
    <div className="loader-page">
      {/* <figure className="page"></figure>
      <figure className="page"></figure>
      <figure className="page"></figure>
    */}

      <div>
        <Image src={loader} />
        <div style={{ color: "#333" }}>Loading Shelf...</div>
      </div>
    </div>
  );
};
