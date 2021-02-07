import './App.css';
import Header from './components/Header'
import Home from './components/Home';
import LoginPage from './components/LoginPage'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Checkout from './components/Checkout';
import { auth } from './firebase';
import { useEffect } from 'react';
import { useStateValue } from './StateProvider';

function App() {

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('User logged in is:', authUser);

      if (authUser) {
        // just logged in or was already logged in 
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, []) //runs only once at load


  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
