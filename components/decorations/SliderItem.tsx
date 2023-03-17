import React from "react";
// import {connect} from 'react-redux'
// import styled from 'styled-components'
// import {changeDecoration} from '../../actions/profile'
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

const SliderItem = ({ item, bookcaseId }) => {
  const decoration = "";
  const active = item.id === decoration ? true : false;

  const router = useRouter();

  const onClick = (item) => {
    const res = axios
      .put("/api/bookcase/swapDecoration", {
        bookcaseId,
        decoration: item.id,
      })
      .then((res) => {
        router.replace(router.asPath);
      });
  };
  return (
    <div
      className={`slider-item ${active ? "active" : ""}`}
      onClick={() => onClick(item)}
    >
      <Image src={item.icon} alt="" height="80%" width="80%" />
    </div>
  );
};

export default SliderItem;
