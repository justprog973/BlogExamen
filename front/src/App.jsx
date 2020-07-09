//React
import React,{useEffect,useState} from 'react';
import {BrowserRouter} from "react-router-dom";

//CSS
import 'semantic-ui-css/semantic.min.css';

//Elements Perso
import {apiFetch}   from './utils/api';
import Router       from './components/render/Router';


const App = ()=>{
    const [user,setUser] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(function(){
        apiFetch('auth')
        .then((user)=> {setUser(user); setLoading(false);})
        .catch(()=>{setUser(null); setLoading(false);});
    },[]);

    if(user === null){
        setLoading(false);
    }

    return <BrowserRouter>
                <Router user={user} setUser={setUser} loading={loading} />
            </BrowserRouter>
}

export default App;