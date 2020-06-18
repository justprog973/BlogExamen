import React from 'react';
import Navbar from '../Navbar/Navbar';
import './StyleBlog.css';

const Blog = () =>{
    return (
        <React.Fragment>
            <Navbar/>
            <div className="container">
                <div className="sidebar">
                </div>
                <div className="blog-body">
                </div> 
            </div>
        </React.Fragment>
    );
}


export default Blog;