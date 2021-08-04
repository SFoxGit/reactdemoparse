import './App.css';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Header/header';
import Homepage from './Homepage/homepage';
import Results from './Results/results';
import Add from './Add/add'
import { useState } from 'react';

function App() {
  const [matchData, setMatchData] = useState();
  const [summaryStats, setSummaryStats] = useState([]);
  const [summary, setSummary] = useState();

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/results">
          <Results matchData={matchData} setSummaryStats={setSummaryStats} summaryStats={summaryStats} />
        </Route>
        <Route exact path="/add">
          <Add 
          setMatchData={setMatchData} 
          setSummaryStats={setSummaryStats}
          setSummary={setSummary}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
