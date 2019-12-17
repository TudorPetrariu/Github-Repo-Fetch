import React from 'react'
import Main from './components/Main.js'
import Header from './components/Header'
import SignIn from './components/SignIn'
import 'materialize-css/dist/css/materialize.min.css';

function App() {


  return (
    <div className="App">
      <Header></Header>
      <Main></Main>
      <SignIn></SignIn>
    </div>
  );
}

export default App;
