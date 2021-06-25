import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { answerQuestion } from "../../store/questions-slice";
import classes from "./QuestionDetails.module.css";

const QuestionDetails = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [isAnsweredByCurrentUser, setIsAnsweredByCurrentUser] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const optionOneRef = useRef();
  const optionTwoRef = useRef();
  const dispatch = useDispatch();

  const { id } = useParams();
  const question = useSelector((state) => state.questions.questions[id]);

  useEffect(() => {
    if (!question) return <p>Not Found</p>;

    if (question.optionOne.votes.includes(currentUser.id)) {
      setIsAnsweredByCurrentUser(true);
      setSelectedOption("o1");
    }
    if (question.optionTwo.votes.includes(currentUser.id)) {
      setIsAnsweredByCurrentUser(true);
      setSelectedOption("o2");
    }
  }, [currentUser.id, question]);

  const { avatarURL, name: authorName } = useSelector(
    (state) => state.users.users[question.author]
  );

  const anserQuestionHandler = (e) => {
    e.preventDefault();

    const answer = {
      authedUser: currentUser.id,
      qid: question.id,
      answer: optionOneRef.current.checked ? "optionOne" : "optionTwo",
    };

    const selectedOption = optionOneRef.current.checked ? "o1" : "o2";

    const exec = () => {
      setIsAnsweredByCurrentUser(true);
      setSelectedOption(selectedOption);
    };

    setTimeout(() => {
      exec();
    }, 2000);

    dispatch(answerQuestion(answer));
  };

  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;
  const percentageForOptionOne = Math.round(
    (optionOneVotes / totalVotes) * 100
  );
  const percentageForOptionTwo = 100 - percentageForOptionOne;

  return (
    <div className={classes.card}>
      <img src={avatarURL} alt="avatar" style={{ width: "100%" }} />
      <h1>{authorName} asks</h1>
      <p className="title">Would You Rather</p>
      {!isAnsweredByCurrentUser && (
        <form onSubmit={anserQuestionHandler}>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="radio1"
              name="optradio"
              value="optionOne"
              ref={optionOneRef}
            />
            {question.optionOne.text}
          </div>
          <p className="my-3">OR</p>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="radio2"
              name="optradio"
              value="optionTwo"
              ref={optionTwoRef}
              required
            />
            {question.optionTwo.text}
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
      {isAnsweredByCurrentUser && (
        <div>
          <div className="form-group">
            <input
              type="text"
              className={`form-control my-2 ${
                selectedOption === "o1" ? "border border-4 border-success" : ""
              }`}
              value={question.optionOne.text}
              readOnly
            />
          </div>
          <p>{`${optionOneVotes} out of ${totalVotes}`}</p>
          <p>{`${percentageForOptionOne}%`}</p>

          <div className="form-group">
            <input
              type="text"
              className={`form-control my-2 ${
                selectedOption === "o2" ? "border border-4 border-success" : ""
              }`}
              value={question.optionTwo.text}
              readOnly
            />
            <p>{`${optionTwoVotes} out of ${totalVotes}`}</p>
            <p>{`${percentageForOptionTwo}%`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDetails;
