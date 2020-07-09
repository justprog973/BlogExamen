import React from 'react';
import './style_footer.css';

export default function Footer(){
    return <div className="ui inverted vertical footer segment position-footer">
            <div className="ui container">
                Web Site created by JUSTPROG All Rigth Reserved &copy; { Date("Y")}.
            </div>
    </div>
}