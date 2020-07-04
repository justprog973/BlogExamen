import React,{useEffect} from 'react';
import  './style_navbar.css';
import story_blog from '../../assets/img/story_blog_new.svg';

export default () =>{
    useEffect(() =>{
        const icon = document.getElementById('icon');
        const nav  = document.getElementById('nav');

        icon.addEventListener('click',()=>{
            icon.classList.toggle('close');
            nav.classList.toggle('show');
        });
    });
    return <div className="mb-75">
        <nav className="ui fixed menu navbar">
            <div className="ui container d-flex-row">
                <figure className="contains-logo">
                    <figcaption className="logo">
                        <img src={story_blog} alt="jp-logo"/>
                    </figcaption>
                </figure>
                <div class="button-menu" id="icon">
                    <span className="line"></span>
                </div>
                <ul class="navbar-nav" id="nav">
                    <li className="item-link active"><a href="#">Home</a></li>
                    <li className="item-link"><a href="#">Blog</a></li>
                    <li className="item-link"><a href="#">Crée</a></li>
                    <li className="item-link"><a href="#">profile</a></li>
                    {/* <li className="item-link"><a href="#">Admin</a></li> */}
                </ul>
            </div>
        </nav>
    </div>
}