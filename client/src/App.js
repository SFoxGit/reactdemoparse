import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Header/header';
import Homepage from './Homepage/homepage';
import Results from './Results/results';
import Add from './Add/add'
import { useState } from 'react';
import Login from './Login/login';
import Collection from './Collection/collection';

function App() {
  const [matchData, setMatchData] = useState([]);
  const [summaryStats, setSummaryStats] = useState([]);
  const [summary, setSummary] = useState([]);
  const [match, setMatch] = useState();
  const [matches, setMatches] = useState([]);
  const [spikeLog, setSpikeLog] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [userId, setUserId] = useState()
  const [collection, setCollection] = useState([])

  return (
    <Router>
      <Header loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/login">
          <Login setLoggedIn={setLoggedIn} setUserId={setUserId} />
        </Route>
        <Route exact path="/results">
          <Results
            matchData={matchData}
            setSummaryStats={setSummaryStats}
            summaryStats={summaryStats}
            match={match}
            setMatch={setMatch}
            matches={matches}
            summary={summary}
            spikeLog={spikeLog}
          />
        </Route>
        <Route exact path="/add/:id">
          <Add
            setMatchData={setMatchData}
            setSummaryStats={setSummaryStats}
            setSummary={setSummary}
            setMatches={setMatches}
            setSpikeLog={setSpikeLog}
          />
        </Route>
        <Route exact path="/collections">
          {loggedIn ?
            <Collection
              collection={collection}
              setCollection={setCollection}
              userId={userId}
            />
            :
            <Login setLoggedIn={setLoggedIn} setUserId={setUserId} />

          }
        </Route>
        <Route exact path="/match/:id">
          <Results
            matchData={matchData}
            setSummaryStats={setSummaryStats}
            summaryStats={summaryStats}
            match={match}
            setMatch={setMatch}
            matches={matches}
            summary={summary}
            setSummary={setSummary}
            spikeLog={spikeLog}
            setMatches={setMatches}
            setMatchData={setMatchData}

          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
