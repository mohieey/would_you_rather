import { Fragment } from "react";

import classes from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      <main className={classes.main}>{children}</main>
    </Fragment>
  );
};

export default Layout;
