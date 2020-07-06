//React
import React,{useEffect,useState} from 'react';
import {BrowserRouter as Router, Switch, Route, useHistory} from "react-router-dom";
//CSS
import 'semantic-ui-css/semantic.min.css';
//Elements Perso
import Blog         from './components/blog/Blog';
import Home         from './components/home/Home';
import Sign         from './components/sign/Sign';
import Profile      from './components/profile/Profile';
import {apiFetch}   from './utils/api';
import Navbar       from './components/navbar/Navbar';


const App = ()=>{
    const [user,setUser] = useState(false);
    useEffect(function(){
        apiFetch('auth')
        .then(setUser)
        .catch(()=>setUser(false));
    },[]);
    if(user === null){
        return null;
    }
        return <>
            <Router>
                   <Navbar user={user}/>
                   <Switch>
                    <Route path={"/"}      exact component={Home} />
                    <Route path={"/blog"}  exact component={Blog} />
                    {!user && <Route path={"/sign"}    exact render={(props) => <Sign {...props} onConnect={setUser}/>}/>}
                    {user && <Route path={"/profile"}  exact render={(props) => <Profile {...props} user={user}/>}/>}
                    <Route path={"/"} component={()=> <h1>Error 404 merci de partir d'ici.</h1>}/>
                   </Switch>
            </Router>
        </>
}

export default App;