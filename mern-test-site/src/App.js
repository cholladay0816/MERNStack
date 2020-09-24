import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/home/navbar.component";
import UserLogin from "./components/user/login.component";
import UserRegister from "./components/user/register.component";
import UserProfile from "./components/user/profile.component";
import WorklogList from "./components/worklog/list.component";
import WorklogView from "./components/worklog/view.component";
import WorklogAdd from "./components/worklog/add.component";
import Home from "./components/home/index.component";

function App() {
  return (
    <Router> 
      <Navbar/>
      <br/> 
      <Route path="/" exact component={Home} />
      <Switch>
        <Route path="/user/login" exact component={UserLogin} />
        <Route path="/user/register" exact component={UserRegister} />
        <Route path="/user" exact component={UserProfile} />
        <Route path="/user/:username" exact component={UserProfile} />
      </Switch>
      <Switch>
        <Route path="/worklog" exact component={WorklogList} />
        <Route path="/worklog/add" exact component={WorklogAdd} />
        <Route path="/worklog/:id" component={WorklogView} />
      </Switch>
    </Router>
  );
}

export default App;
