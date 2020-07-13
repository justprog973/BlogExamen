import React,{useEffect} from 'react';


export default function Home () {
    useEffect(()=>{
        document.title = "Story Blog | Home";
    });
    return <>
        <div className="ui container">
            <h1>Home</h1>
        </div>
    </>
}