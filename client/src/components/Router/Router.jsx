//React
import React from 'react';
import {Loader} from 'semantic-ui-react';
import {Switch, Route, Redirect, useLocation} from "react-router-dom";
//Elements custom
import Blog from '../Blog/Blog';
import Home from '../Home/Home';
import Sign from '../Sign/Sign';
import Profile from '../Profile/Profile';
import Navbar from '../Navbar/Navbar';
import Dashboard from '../Dashboard/Dashboard';
import SinglePost from "../SinglePost/SinglePost";
import Footer from '../Footer/Footer';
import MentionsLegales from "../MentionsLegales/MentionsLegales";
import NotFound from "../NotFound/NotFound";
import Reset from "../Reset/Reset";


export default function Router({user, setUser, loading}) {
    const location = useLocation();
    if (!loading) {
        return <>
            <Navbar user={user} setUser={setUser}/>
            <main className="app">
                <Switch>
                    <Route path={"/"} exact component={(props)=> <Home {...props} user={user} />}/>
                    {/* Route Blog */}
                    <Route path={"/blog"} exact component={Blog}/>
                    {/* Route SinglePost */}
                    <Route path={"/blog/post/:id"} exact component={SinglePost}/>
                    {/* Route Reset Password */}
                    <Route path={"/reset-password/:id"} exact component={Reset}/>
                    {/* Route Mentions Legales */}
                    <Route path={"/mentions-legales"} exact component={MentionsLegales}/>
                    {/* Route Sign */}
                    {!user && <Route path={"/login"} exact component={(props) => <Sign {...props} onConnect={setUser}/>}/>}
                    {/* Route Profile */}
                    {user ? <Route path={"/profile"} exact component={(props) => <Profile {...props} user={user} action={{onConnect: setUser}} />}/> :
                        <Route path={"/profile"} exact component={() => <Redirect to={"/login"}/>}/>}
                    {/* Route Dashboard */}
                    {user ? <Route path={"/dashboard"} exact component={(props) => <Dashboard {...props} user={user}/>}/> :
                        <Route path={"/dashboard"} exact component={() => <Redirect to={"/login"}/>}/>}
                    {/* Route Sign redirect */}
                    {user && <Route path={"/login"} exact component={() => <Redirect to={"/blog"}/>}/>}
                    <Route component={NotFound} />
                </Switch>
            </main>
            {location.pathname !== '/login' &&  <Footer user={user} />}
        </>
    }
    return <div className="ui grid centered">
        <Loader active size="massive"/>
    </div>
}