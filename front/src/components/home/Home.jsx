import React,{useEffect} from 'react';
import Header from '../header/Header';


export default function Home () {
    useEffect(()=>{
        document.title = "Story Blog | Home";
    });
    return <>
        <Header/>
        <div className="ui container">
            <h1>Home</h1>
        </div>
    </>
}