import classes from "./Question.module.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const Question = ({ question }) => {
  const { id, author, optionOne, optionTwo } = question;
  const avater = useSelector((state) => state.users.users[author].avatarURL);
  const authorName = useSelector((state) => state.users.users[author].name);

  const history = useHistory();

  const viewPollHandler = () => {
    history.push(`/questions/${id}`);
  };
  return (
    <div className={classes.card}>
      <img src={avater} alt="John" style={{ width: "100%" }} />
      <h1>{authorName} asks</h1>
      <p className="title">Would You Rather</p>
      <p>{optionOne.text}</p>
      <p>or</p>
      <p>{optionTwo.text}</p>
      <p>
        <button onClick={viewPollHandler}>View Poll</button>
      </p>
    </div>
  );
};

export default Question;
