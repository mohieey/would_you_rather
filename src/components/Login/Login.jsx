import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useHistory } from "react-router-dom";

const Login = () => {
  const usersDropdownRef = useRef();
  const users = useSelector((state) => state.users.users);
  const [usersArr, setUsersArr] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const loginHandler = () => {
    dispatch(authActions.login(users[usersDropdownRef.current.value]));
    history.push("/questions");
  };

  useEffect(() => {
    const usersArr = [];
    for (const key in users) {
      usersArr.push(users[key]);
    }
    setUsersArr(usersArr);
  }, [users]);

  return (
    <div className="card bg-light">
      <div className="card-body text-center">
        <h3 className="card-text">Login</h3>
        <div className="form-group">
          <label htmlFor="usersDropdown">Select User</label>
          <select
            ref={usersDropdownRef}
            className="form-control"
            id="usersDropdown"
          >
            {usersArr.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button onClick={loginHandler} className="btn btn-info my-4">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
