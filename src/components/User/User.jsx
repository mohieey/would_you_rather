import classes from "./User.module.css";

const User = ({ user }) => {
  const answeredQuestions = Object.keys(user.answers).length;
  const askedQuestions = user.questions.length;
  const score = answeredQuestions + askedQuestions;

  return (
    <div className={classes.card}>
      <img src={user.avatarURL} alt="avatar" style={{ width: "100%" }} />
      <h1>{user.name}</h1>
      <h3 className="title">{`Score: ${score}`}</h3>
      <p>{`Answered Questions: ${answeredQuestions}`}</p>
      <p>{`Asked Questions: ${askedQuestions}`}</p>
    </div>
  );
};

export default User;
