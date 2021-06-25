import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { saveQuestion } from "../../store/questions-slice";

const NewQuestion = () => {
  const optionOneRef = useRef();
  const optionTwoRef = useRef();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  if (!currentUser) history.push("/login");

  const addQuestionHandler = (e) => {
    e.preventDefault();
    const newQuestion = {
      author: currentUser.id,
      optionOneText: optionOneRef.current.value,
      optionTwoText: optionTwoRef.current.value,
    };
    dispatch(saveQuestion(newQuestion, history));
  };

  return (
    <div className="card bg-light">
      <div className="card-body text-center">
        <p className="card-text">Whould you rather</p>
        <form onSubmit={addQuestionHandler}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="optionOne"
              placeholder="option one"
              name="optionOne"
              required
              ref={optionOneRef}
            />
          </div>
          <p>or</p>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="optionTwo"
              placeholder="option two"
              name="optionTwo"
              required
              ref={optionTwoRef}
            />
          </div>
          <button type="submit" className="btn btn-primary my-3 bg-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewQuestion;
