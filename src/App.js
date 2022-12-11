import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
// import Dashboard from './components/Dashboard';
import Login from './components/Login';
// import Navbar from './components/Navbar';
// import Signup from './components/Signup';
//import Context from './context';
import SingleCocktail from './pages/SingleMention';

function App(props) {
  return (
    <Router>
    
      <div className="container bg-gradent-success">
        App
        {/* <Search/> */}
        <Switch>
          <Route path="/" exact component={Login}/>
         
          <Route path="/login" exact component={Login}/>
        
          <Route exact path ="/cocktail/:id">
           <SingleCocktail />
         </Route>
         
        </Switch>
      </div>
    
    </Router>
  );
}

export default App;
