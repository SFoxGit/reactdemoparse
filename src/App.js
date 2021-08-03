import './App.css';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Header/header';
import Homepage from './Homepage/homepage';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/results">
          
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
