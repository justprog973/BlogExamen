import React/*{useState}*/ from 'react';
//import ReactMarkdow from 'react-markdown';
import Login from './Components/Login/Login';
import Blog from './Components/Blog/Blog';

const App = ()=>{
    //const [post,setPost] = useState('');

        return (
            <React.StrictMode>
                <Login/>
            </React.StrictMode>
        );
}

export default App;