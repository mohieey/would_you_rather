import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";

import classes from "./Navbar.module.css";

const Navbar = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.push("/login");
  };

  return (
    <header className={classes.header}>
      {currentUser && (
        <div className={classes.logo}>
          <img
            src={currentUser.avatarURL}
            alt="avatar"
            style={{ width: "60px" }}
          />
          Logged as {currentUser.name}
        </div>
      )}

      <nav className={classes.nav}>
        <ul>
          {currentUser && (
            <li>
              <NavLink to="/questions" activeClassName={classes.active}>
                All Questions
              </NavLink>
            </li>
          )}
          {currentUser && (
            <li>
              <NavLink to="/add" activeClassName={classes.active}>
                New Question
              </NavLink>
            </li>
          )}
          {currentUser && (
            <li>
              <NavLink to="/leaderboard" activeClassName={classes.active}>
                Leaderboard
              </NavLink>
            </li>
          )}
          {currentUser && (
            <li className="text-light" onClick={logoutHandler}>
              Logut
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
