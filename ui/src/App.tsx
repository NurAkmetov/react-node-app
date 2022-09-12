import React from 'react';
import { Main } from './components/main/Main';
import { LeftBar } from './components/leftbar/LeftBar';

function App() {
  return (
      <React.Fragment>
        <LeftBar />
        <Main />
      </React.Fragment>
  );
}

export default App;
