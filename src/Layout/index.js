import React, { Fragment } from "react";
import Header from "./Header";
import NotFound from "./NotFound";

function Layout() {
  return (
    <Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <NotFound />
      </div>
    </Fragment>
  );
}

export default Layout;
