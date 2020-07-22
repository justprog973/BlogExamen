//React
import React from 'react';
//CSS
import {Card,Loader} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import './uiStyle.css';

function CardCustom({post}) {
    console.log(post);
    if(post.length  !== 0){
        return <Card.Group className="card-group">
            {post.map((p,i) => {
                return <Card key={ p._id}
                             image={`uploads/posts/thumb_${p.attachment}`}
                             header={<Link to={`/blog/${p._id}`}>{p.title}</Link>}
                             meta='Friend'
                             description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                />
            })}
        </Card.Group>
    }else{
        return <h2>Aucun poste correspendante ...</h2>
    }
}



export default  function CardPost ({posts, postLoading}){
    return posts === null || postLoading ?  <Loader active inline="centered" /> :  <CardCustom post={posts}/>;
};