import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {usePosts} from "../../hooks/posts";
import {Grid, Label, Loader, Image} from 'semantic-ui-react';
import ReactMarkdown from "react-markdown";

export default function SinglePost() {
    const {id} = useParams();
    const {fetchSinglePost, posts: post, loading: loadingPost, errors} = usePosts();

    useEffect(function () {
        if(!errors){
            fetchSinglePost(id);
        }
    },[id,fetchSinglePost,errors]);

    if(!loadingPost) {
        if (post) {
            return <div className="ui container">
                <h1 className='font-cinzel font-size-30'>
                    {post.title}
                </h1>
                <Grid className='font-montserrat'>
                    <Grid.Row>
                        <Grid.Column>
                            <Label size='huge' className='mb-10 mt-10' color='teal'>
                                Auteur : {post.author.username}
                            </Label>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            {post.categories.map(c => <Label key={c._id} size='large'>{c.name}</Label>)}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className='mt-30'>
                        <Grid.Column>
                            <Image src={`/uploads/posts/${post.attachment}`}  floated='left' size="big" rounded={true} bordered={true}/>
                            <ReactMarkdown source={post.content} escapeHtml={false} className='font-size-20'/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        } else {
            return <div className="ui container">
                <div className="centered-custom">
                <h1>Pas d'article correspendant a ce poste</h1>
                </div>
            </div>
        }
    }
    return <div className="ui grid centered">
        <Loader active size="massive"/>
    </div>
}