import { createSlice } from "@reduxjs/toolkit";

import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "../_DATA";

const questionsSlice = createSlice({
  name: "questions",
  initialState: { questions: null },
  reducers: {
    populateQuestions(state, action) {
      state.questions = action.payload;
    },
  },
});

export const questionsActions = questionsSlice.actions;

export const fetchQuestions = (setIsLoading) => {
  return (dispatch) => {
    _getQuestions().then((questions) => {
      dispatch(questionsActions.populateQuestions(questions));
      setIsLoading(false);
    });
  };
};

export const saveQuestion = (newQuestion, history) => {
  return (dispatch) => {
    _saveQuestion(newQuestion).then(() => {
      history.push("/questions");
    });
  };
};

export const answerQuestion = (answer, exec) => {
  return (dispatch) => {
    _saveQuestionAnswer(answer)
      .then(() => {
        return _getQuestions();
      })
      .then((questions) => {
        dispatch(questionsActions.populateQuestions(questions));
      });
  };
};

export default questionsSlice;
