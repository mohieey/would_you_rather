import { _getQuestions } from "./_DATA";

export const getQuestion = async (id) => {
  const data = await _getQuestions();
  console.log("in util");
  console.log(data[id]);
  return data[id];
};
