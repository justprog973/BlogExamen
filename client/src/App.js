import React/*{useState}*/ from 'react';
//import ReactMarkdow from 'react-markdown';
import Login from './Components/Login/Login';
import Blog from './Components/Blog/Blog';
import BlogFrom from './Components/Blog/Form/BlogFrom';
import Navbar from './Components/Navbar/Navbar';
import { Fragment } from 'react';
const App = ()=>{
    //const [post,setPost] = useState('');

        return (
            <React.Fragment>
                <Navbar/>
                <Login/>
            </React.Fragment>
        );
}

export default App;