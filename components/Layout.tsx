import React, { ReactNode } from "react";
import useMediaQuery from "../utils/useMediaQuery";
import Header from "./Header";
import Header2 from "./Header2";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const isMobile = useMediaQuery("(max-width: 800px)");

  return (
    <div>
      {isMobile ? <Header2 /> : <Header />}
      <div className="layout">{props.children}</div>
    </div>
  );
};

export default Layout;
