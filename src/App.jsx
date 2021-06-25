import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import AllQuestions from "./components/AllQuestions/AllQuestions";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/auth-slice";

import NewQuestion from "./components/NewQuestion/NewQuestion";
import QuestionDetails from "./components/QuestionDetails/QuestionDetails";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import NotFound from "./components/NotFound";
import { fetchUsers } from "../src/store/users-slice";
import { fetchQuestions } from "./store/questions-slice";

function App() {
  const dispatch = useDispatch();
  const currentUser =
    useSelector((state) => state.auth.currentUser) ||
    JSON.parse(localStorage.getItem("authedUser"));

  if (currentUser) {
    dispatch(authActions.login(currentUser));
  }

  dispatch(fetchUsers());
  dispatch(fetchQuestions(null));

  if (!currentUser)
    return (
      <Layout>
        <Switch>
          <Route
            path={[
              "/",
              "/login",
              "/questions",
              "/questions/:id",
              "/leaderboard",
            ]}
            exact
          >
            <Login />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    );

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="./questions" />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/questions" exact>
          <AllQuestions currentUser={currentUser} />
        </Route>
        <Route path="/questions/:id">
          <QuestionDetails />
        </Route>
        <Route path="/add">
          <NewQuestion />
        </Route>
        <Route path="/leaderboard">
          <Leaderboard />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
