import React,{useState,useEffect} from 'react';
import './StyleBlogForm.css';
import ReactMarckdone from 'react-markdown';

const BlogFrom = () =>{
    const [content,setContent] = useState('');

    return (
        <div className="blog-form-grid">
            <div className="blog-form-sidebar">
                <div className="blog-form-group">
                    <label for="file">Chose your picture</label>
                    <input type="file" className="blog-form-control-file"/>
                </div>
                <div className="blog-form-group">
                    <label for="title">Title</label>
                    <input type="text" max-length="10" className="blog-form-controls"/>
                </div>
                <div className="blog-form-group">
                    <label for="title">Content</label>
                    <textarea className="blog-form-control-textarea" onChange={e => setContent(e.target.value)}></textarea>
                </div>
            </div>
            <div className="blog-form-body">
                <ReactMarckdone source={content}/>
            </div> 
        </div>
    )
};

export default BlogFrom;