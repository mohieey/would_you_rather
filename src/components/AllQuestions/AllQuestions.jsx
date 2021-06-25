import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestions } from "../../store/questions-slice";

import Question from "../Question/Question";

const AllQuestions = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [isLoading, setIsLoading] = useState(true);

  const questions = useSelector((state) => state.questions.questions);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [unAnsweredQuestions, setUnAnsweredQuestions] = useState([]);

  const [cssClasses, setCssClasses] = useState({
    unAnsClasses: "nav-link active bg-success",
    ansClasses: "nav-link ",
  });
  const [toShow, setToShow] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuestions(setIsLoading));
  }, [dispatch]);

  useEffect(() => {
    const questionsArr = [];
    for (const key in questions) {
      questionsArr.push(questions[key]);
    }

    const answeredQuestions = [];
    const unAnsweredQuestions = [];
    for (const question of questionsArr) {
      if (
        question.optionOne.votes.includes(currentUser.id) ||
        question.optionTwo.votes.includes(currentUser.id)
      ) {
        answeredQuestions.push(question);
      } else {
        unAnsweredQuestions.push(question);
      }
    }

    setCssClasses((prev) => {
      if (prev.unAnsClasses === "nav-link active bg-success") return prev;

      return { unAnsClasses: prev.ansClasses, ansClasses: prev.unAnsClasses };
    });

    setAnsweredQuestions(answeredQuestions);
    setUnAnsweredQuestions(unAnsweredQuestions);
    setToShow(unAnsweredQuestions);
  }, [questions, currentUser.id]);

  // useEffect(() => {
  //   const answeredQuestions = [];
  //   const unAnsweredQuestions = [];
  //   for (const question of questionsArr) {
  //     if (
  //       question.optionOne.votes.includes(currentUser.id) ||
  //       question.optionTwo.votes.includes(currentUser.id)
  //     ) {
  //       answeredQuestions.push(question);
  //     } else {
  //       unAnsweredQuestions.push(question);
  //     }
  //   }
  //   setCssClasses((prev) => {
  //     if (prev.unAnsClasses === "nav-link active bg-success") return prev;
  //     return { unAnsClasses: prev.ansClasses, ansClasses: prev.unAnsClasses };
  //   });
  //   setAnsweredQuestions(answeredQuestions);
  //   setUnAnsweredQuestions(unAnsweredQuestions);
  //   setToShow(unAnsweredQuestions);
  // }, [questionsArr]);

  const showUnAnsweredQuestionsHandler = () => {
    setToShow(unAnsweredQuestions);
    setCssClasses((prev) => {
      if (prev.unAnsClasses === "nav-link active bg-success") return prev;

      return { unAnsClasses: prev.ansClasses, ansClasses: prev.unAnsClasses };
    });
  };

  const showAnsweredQuestionsHandler = () => {
    setToShow(answeredQuestions);
    setCssClasses((prev) => {
      if (prev.ansClasses === "nav-link active bg-success") return prev;

      return { unAnsClasses: prev.ansClasses, ansClasses: prev.unAnsClasses };
    });
  };

  return (
    <Fragment>
      {isLoading && <h1>Loading....</h1>}
      {!isLoading && (
        <div>
          <ul className="nav nav-pills nav-justified my-5">
            <li className="nav-item">
              <button
                className={cssClasses.unAnsClasses}
                onClick={showUnAnsweredQuestionsHandler}
              >
                Un Answered Questions
              </button>
            </li>
            <li className="nav-item">
              <button
                className={cssClasses.ansClasses}
                onClick={showAnsweredQuestionsHandler}
              >
                Answered Questions
              </button>
            </li>
          </ul>
          <div>
            {toShow.map((question) => (
              <Question key={question.id} question={question} />
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AllQuestions;
