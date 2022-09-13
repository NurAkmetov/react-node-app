import React from 'react';
import {Main} from './components/main/Main';
import {LeftBar} from './components/leftbar/LeftBar';
import {ProgressBar} from "./components/leftbar/ProgressBar";

function App() {
    return (
        <React.Fragment>
            <LeftBar/>
            <Main/>
            <ProgressBar/>
        </React.Fragment>
    );
}

export default App;
