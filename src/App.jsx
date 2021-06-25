import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import AllQuestions from "./components/AllQuestions/AllQuestions";
import { useSelector } from "react-redux";
import NewQuestion from "./components/NewQuestion/NewQuestion";
import QuestionDetails from "./components/QuestionDetails/QuestionDetails";
import User from "./components/User/User";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import NotFound from "./components/NotFound";

function App() {
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
          <AllQuestions />
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
