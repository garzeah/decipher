import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Register from "../../pages/Register/Register";
import Login from "../../pages/Login/Login";
import Messenger from "../../pages/Messenger/Messenger";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/Messenger" component={Messenger} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
