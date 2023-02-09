import Image from "next/image";
import React from "react";
import loader from "../../public/static/icons/book-loader.gif";

type Props = {};

export const Loader = (props: Props) => {
  return (
    <div className="loader-page">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image src={loader} />
        <div
          style={{
            color: "#333",
            marginTop: "6px",
            marginLeft: "5px",
            fontSize: "18px",
          }}
        ></div>
      </div>
    </div>
  );
};
