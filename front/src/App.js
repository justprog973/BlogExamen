import React/*{useState}*/ from 'react';
import 'semantic-ui-css/semantic.min.css';
import Sign from './components/sign/Sign';
import Navbar from './components/navbar/Navbar';
const App = ()=>{
        return (
            <React.Fragment>
                <Navbar/>
                <Sign/>
            </React.Fragment>
        );
}

export default App;