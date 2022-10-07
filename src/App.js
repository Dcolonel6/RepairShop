import NavBar from "./Components/NavBar/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Components/Pages/Home/Home";
import Phones from "./Components/Pages/Phones";
import Users from "./Components/Pages/Users";
import Tickets from "./Components/Pages/Tickets";

import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <BrowserRouter forceRefresh={true}>
      <div className="">
        <NavBar />
        <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="/phones">
            <Phones />
          </Route>
          <Route path="/teams">
            <Users />
          </Route>
          <Route path="/tickets">
            <Tickets />
          </Route> 
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
