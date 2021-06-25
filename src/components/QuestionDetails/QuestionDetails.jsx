import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { answerQuestion } from "../../store/questions-slice";
import classes from "./QuestionDetails.module.css";
import NotFound from "./../NotFound";

const QuestionDetails = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [isAnsweredByCurrentUser, setIsAnsweredByCurrentUser] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const optionOneRef = useRef();
  const optionTwoRef = useRef();
  const dispatch = useDispatch();

  const { id } = useParams();
  // const question = useSelector((state) => state.questions.questions[id]);
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);
  const [question, setQuestion] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (questions.questions) {
      if (questions.questions[id]) {
        setQuestion(questions.questions[id]);
      } else {
        setNotFound(true);
        setIsLoading(false);
      }
    }
  }, [questions, id]);

  useEffect(() => {
    if (question) {
      setOptionOneVotes(question.optionOne.votes.length);
      setOptionTwoVotes(question.optionTwo.votes.length);
      setTotalVotes(
        question.optionOne.votes.length + question.optionTwo.votes.length
      );
      setPercentageForOptionOne(
        Math.round(
          (question.optionOne.votes.length /
            (question.optionOne.votes.length +
              question.optionTwo.votes.length)) *
            100
        )
      );
      setPercentageForOptionTwo(
        100 -
          (question.optionOne.votes.length /
            (question.optionOne.votes.length +
              question.optionTwo.votes.length)) *
            100
      );

      setOptionOneText(question.optionOne.text);
      setOptionTwoText(question.optionTwo.text);
    }
  }, [question]);

  useEffect(() => {
    if (users.users && question) {
      setUser(users.users[question.author]);
    }
  }, [users, question]);

  useEffect(() => {
    if (user) {
      setAvatarURL(user.avatarURL);
      setAuthorName(user.name);
      setIsLoading(false);
    }
  }, [user]);

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

  const [optionOneVotes, setOptionOneVotes] = useState(0);
  const [optionTwoVotes, setOptionTwoVotes] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [percentageForOptionOne, setPercentageForOptionOne] = useState(0);
  const [percentageForOptionTwo, setPercentageForOptionTwo] = useState(0);
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [authorName, setAuthorName] = useState("");

  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  if (notFound) return <NotFound />;

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
            {optionOneText}
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
            {optionTwoText}
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
