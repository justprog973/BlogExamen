//React
import React, {useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";

//CSS
import 'semantic-ui-css/semantic.min.css';

//Elements custom
import {apiFetch} from './utils/api';
import Router from './components/router/Router';


export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(function () {
        apiFetch('auth')
            .then((user) => {
                setUser(user);
                setLoading(false);
            })
            .catch(() => {
                setUser(null);
                setLoading(false);
            });
    }, []);

    return <BrowserRouter>
            <Router user={user} setUser={setUser} loading={loading}/>
        </BrowserRouter>
};
