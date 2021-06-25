import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchUsers } from "../../store/users-slice";
import User from "../User/User";

const Leaderboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users.users);
  const [usersArr, setUsersArr] = useState([]);
  useEffect(() => {
    const usersArr = [];
    for (const key in users) {
      usersArr.push(users[key]);
    }
    setUsersArr(usersArr);
  }, [users]);

  return (
    <div>
      {usersArr
        .sort((a, b) => {
          const scoreOne = Object.keys(a.answers).length + a.questions.length;
          const scoreTwo = Object.keys(b.answers).length + b.questions.length;

          if (scoreOne < scoreTwo) {
            return 1;
          }

          if (scoreOne > scoreTwo) {
            return -1;
          }
          return 0;
        })
        .map((user) => (
          <User key={user.id} user={user} />
        ))}
    </div>
  );
};

export default Leaderboard;
