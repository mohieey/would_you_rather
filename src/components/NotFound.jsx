import { Fragment } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Fragment>
      <h1>404 Not Found</h1>
      <h3>Do you want to login ?</h3>
      <Link className="btn btn-primary" to="/login">
        Login
      </Link>
    </Fragment>
  );
};

export default NotFound;
