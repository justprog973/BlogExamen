import React,{useEffect} from 'react';
import  './style_navbar.css';
import story_blog from '../../assets/img/story_blog_new.svg';
import {NavLink} from 'react-router-dom';

export default ({user}) =>{
    useEffect(() =>{
        const icon = document.getElementById('icon');
        const nav  = document.getElementById('nav');

        icon.addEventListener('click',()=>{
            icon.classList.toggle('close');
            nav.classList.toggle('show');
        });
    });
    return <header className="mb-75">
        <nav className="ui fixed menu navbar">
            <div className="ui container d-flex-row">
                <figure className="contains-logo">
                    <figcaption className="logo">
                        <img src={story_blog} alt="jp-logo"/>
                    </figcaption>
                </figure>
                <div className="button-menu" id="icon">
                    <span className="line"></span>
                </div>
                <ul className="navbar-nav" id="nav">
                    <li className="item-link"><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
                    <li className="item-link"><NavLink to="/blog" exact activeClassName="active">Blog</NavLink></li>
                    {!user ? <li className="item-link"><NavLink to="/sign" exact activeClassName="active">Connexion</NavLink></li>: null}
                    {user ? <li className="item-link"><NavLink to="#Home">profile</NavLink></li> : null}
                    {/* <li className="item-link"><a href="#">Admin</a></li> */}
                </ul>
            </div>
        </nav>
    </header>
}