import React            from 'react';
import {Loader}   from 'semantic-ui-react';
import { Switch, Route, Redirect} from "react-router-dom";
//Elements Perso
import Blog             from '../blog/Blog';
import Home             from '../home/Home';
import Sign             from '../sign/Sign';
import Profile          from '../profile/Profile';
import Admin            from '../admin/Admin';
import Navbar           from '../navbar/Navbar';
import Post             from '../post/Post';
import Footer           from '../footer/Footer';



export default function Router({user,setUser,loading}){
    if(!loading){
        return <>
                <Navbar user={user} setUser={setUser}/> 
                    <main className="app">
                        <Switch>
                            <Route path={"/"}      exact component={Home} />
                            <Route path={"/blog"}  exact component={Blog} />
                            {/* Route Sign */}
                            {!user && <Route path={"/sign"}    exact render={(props) => <Sign {...props} onConnect={setUser}/>}/>}
                            {/* Route Profile */}
                            {user ? <Route path={"/profile"}  exact render={(props) => <Profile {...props} user={user}/>}/>: 
                            <Route path={"/profile"} exact render={()=> <Redirect to={"/"}/>}/>}
                            {/* Route Sign redirect */}
                            {user && <Route path={"/sign"} exact render={()=> <Redirect to={"/"} />}/>}
                            {/* Route admin */}
                            {user && user.isAdmin ? <Route path={"/admin"} exact component={Admin} />:
                                <Route path={"/admin"} exact render={()=> <Redirect to={"/"}/>}/>
                            }
                            <Route component={()=><div className="ui container"><h1>Error 404 veuillez vous retrouver !</h1></div>}/>
                        </Switch>
                    </main>
               </>
    }
    return <div className="ui grid centered">
                <Loader active size="massive" />
           </div>
}