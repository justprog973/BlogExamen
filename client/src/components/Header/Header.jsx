import React, {useEffect, useState} from 'react';
import './style_header.css';
import {citations} from "../../utils/function";

export default function Header() {
    const [citation, setCitation] = useState(randomCitation(citations()));

    useEffect(function () {

        const intervalId = setInterval(function () {
            setCitation(randomCitation(citations()));
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    return <div className="header-body">
        <div className="filter">
            <div className='ui container marge'>
                <p className="citation">{citation.citation}</p>
                <p className="citation-auteur">{citation.auteur}</p>
            </div>
        </div>
    </div>
}


function randomCitation(tabCitations) {
    const random = Math.floor(Math.random() * tabCitations.length);
    return tabCitations[random];
}