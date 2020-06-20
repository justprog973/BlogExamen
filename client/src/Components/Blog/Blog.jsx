import React from 'react';
import Navbar from '../Navbar/Navbar';
import BlogForm from './Form/BlogFrom';
import './StyleBlog.css';

const Blog = () =>{
    return (
        <React.Fragment>
            <Navbar/>
            <div className="container">
                <BlogForm/>
            </div>
        </React.Fragment>
    );
}


export default Blog;