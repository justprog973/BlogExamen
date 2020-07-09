import React from 'react';
import  './style_navbar.css';
import story_blog from '../../assets/img/story_blog_new.svg';
import {Button} from "semantic-ui-react";
import {NavLink} from 'react-router-dom';
import { apiFetch } from '../../utils/api';

export default ({user,setUser}) =>{
    const toggleMenu = function(){
        const icon = document.getElementById('icon');
        const nav  = document.getElementById('nav');
        icon.classList.toggle('close');
        nav.classList.toggle('show');
    };

    async function logout(){
        const isLog = await apiFetch('user/logout');
        if(isLog.success){
            setUser(false);
        }
    }

    return <header className="mb-72">
        <nav className="ui fixed menu navbar">
            <div className="ui container d-flex-row">
                <figure className="contains-logo">
                    <figcaption className="logo">
                        <img src={story_blog} alt="jp-logo"/>
                    </figcaption>
                </figure>
                <div className="button-menu" onClick={toggleMenu} id="icon">
                    <span className="line"></span>
                </div>
                <ul className="navbar-nav" id="nav">
                    <li className="item-link"><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
                    <li className="item-link"><NavLink to="/blog" exact activeClassName="active">Blog</NavLink></li>
                    {!user && <li className="item-link"><NavLink to="/sign" exact activeClassName="active">Connexion</NavLink></li>}
                    {user && <li className="item-link"><NavLink to="/profile">profile</NavLink></li>}
                    {user && <li className="item-link off"><Button circular color="red" icon="power off" onClick={logout}/></li>}
                </ul>
            </div>
        </nav>
    </header>
}