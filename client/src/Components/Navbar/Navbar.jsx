import React,{useEffect} from 'react';
import  './StyleNavbar.css';
import Button from '../../Elements/Components/Button';

const Navbar = () =>{
    useEffect(() =>{
        const icon = document.getElementById('icon');
        const nav  = document.getElementById('nav');

        icon.addEventListener('click',()=>{
            icon.classList.toggle('active');
            nav.classList.toggle('active');
        });
    });
    return (
        <header className="header">
            <nav className="navbar">
                <div className="navbar-brand">
                    Story Blog
                </div>
                <ul className="navbar-nav" id='nav'>
                    <li className="navbar-link">
                        <a href="#">Home</a>
                    </li>
                    <li className="navbar-link active">
                        <a href="#">Sign up</a>
                    </li>
                </ul>
                <div className="icon-content" id="icon">
                    <span className="icon-burger"></span>
                </div>
            </nav>
            <div className="header-body">
                <div className="card-header-body">
                    <h1>Vous avez une histoire ?</h1>
                    <p>Ne la garder pas pour vous voyons !</p>
                    <Button
                        as="a"
                        href="#" 
                        color={'#fff'}
                        bg={'rgb(121, 183, 187)'}
                        br={3}
                        width={170}
                        height={42}
                    >Raconter</Button>
                </div>
            </div>
        </header>
    );
}


export default Navbar;