import React from 'react';
import  './style_navbar.css';
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

    const toggleLink = function(){
        if(window.innerWidth < 1000){
            const icon = document.getElementById('icon');
            const nav  = document.getElementById('nav');
            icon.classList.toggle('close');
            nav.classList.toggle('show');
        }
    };

    const logout = async function(){
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
                        <img src="/assets/img/story_blog_new.svg" alt="jp-logo"/>
                    </figcaption>
                </figure>
                <div className="button-menu" onClick={toggleMenu} id="icon">
                    <span className="line"></span>
                </div>
                <ul className="navbar-nav" id="nav">
                    <li onClick={toggleLink} className="item-link"><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
                    <li onClick={toggleLink} className="item-link"><NavLink to="/blog" activeClassName="active">Blog</NavLink></li>
                    {!user && <li   onClick={toggleLink} className="item-link"><NavLink to="/login" exact activeClassName="active">Login</NavLink></li>}
                    {user && <li    onClick={toggleLink} className="item-link"><NavLink to="/dashboard">Dashboard</NavLink></li>}
                    {user && <li    onClick={toggleLink} className="item-link"><NavLink to="/profile">profile</NavLink></li>}
                    {user && <li    onClick={toggleLink} className="item-link off"><Button color="red" icon="log out" onClick={logout}/></li>}
                </ul>
            </div>
        </nav>
    </header>
}