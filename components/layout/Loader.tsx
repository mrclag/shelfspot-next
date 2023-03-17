import Image from "next/image";
import React from "react";
import loader from "../../public/static/icons/book-loader.gif";

type Props = {};

export const Loader = (props: Props) => {
  return (
    <div className="loader-page">
      <div className='loader-contetn'
      >
        <Image src={loader} />
        <div className='loader-text'
        ></div>
      </div>
    </div>
  );
};
