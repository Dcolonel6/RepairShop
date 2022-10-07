import NavBar from "./Components/NavBar/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Components/Pages/Home/Home";
import Phones from "./Components/Pages/Phones";
import Users from "./Components/Pages/Users";
import Tickets from "./Components/Pages/Tickets";
import "./App.css";

function App() {
  return (
    <BrowserRouter >      
        <NavBar />
        <Switch>
          <Route path="/phones">
            <Phones />
          </Route>
          <Route path="/teams">
            <Users />
          </Route>
          <Route path="/tickets">
            <Tickets />
          </Route> 
          <Route path="/" exact>
            <Home/>
          </Route>
        </Switch>    
    </BrowserRouter>
  );
}

export default App;
