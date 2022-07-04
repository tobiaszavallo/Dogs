import './App.css';
import { Route, Switch } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import CreateDog from './components/CreateDog/CreateDog.jsx';
import Detail from './components/Detail/Detail.jsx';
import About from './components/About/About.jsx';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"} component={LandingPage}/>
        <Route exact path={"/home"} component={Home}/>
        <Route path={"/create"} component={CreateDog} />
        <Route path={"/home/:id"} component={Detail}/>
        <Route path={"/about"} component={About}/>
        <Route path={"/"} component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
