import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
const NavBar = React.lazy(() => import('./components/NavBar'))
const Main = React.lazy(() => import('./components/Main'))


function App() {


  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div id='lazy-nav'>Getting things ready...</div>}>
          <Route path='/' component={NavBar} />
          <Main />
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
