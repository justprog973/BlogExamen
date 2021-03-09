import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {usePosts} from "../../hooks/posts";
import {Grid, Label, Loader, Image, Breadcrumb, Segment} from 'semantic-ui-react';
import ReactMarkdown from "react-markdown";
import {ApiErrors} from "../../utils/api";
import {capitalizeFirstLetter} from "../../utils/function";
import NotFound from "../NotFound/NotFound";

export default function SinglePost() {
    const {id}                                                  = useParams();
    const {fetchSinglePost, posts: post, loading: loadingPost}  = usePosts();
    const [error, setError]                                     = useState(null);

    useEffect( function () {
            async function fetch(){
                try{
                    await fetchSinglePost(id);
                }catch (e) {
                    if(e instanceof ApiErrors){
                        setError('Pas de poste correspendant.');
                    }else{
                        throw e;
                    }
                }
            }
            fetch().catch(function(e){
                if(e instanceof ApiErrors){
                    setError(e);
                }
                throw e;
            });
        window.scrollTo({top: 0, behavior: "smooth"});
    },[id,fetchSinglePost]);

    if(!loadingPost || error) {
        if (post && !error) {
            return <div className="ui container mb-50 ml-mr-10">
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                        <Image src={`/uploads/posts/${post.attachment}`} width='100%' rounded={true}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Grid.Column>
                                <Breadcrumb size='big'>
                                    <Breadcrumb.Section><Link to={'/blog'}>Blog</Link></Breadcrumb.Section>
                                    <Breadcrumb.Divider icon='right angle' />
                                    <Breadcrumb.Section>Poste</Breadcrumb.Section>
                                    <Breadcrumb.Divider icon='right angle' />
                                    <Breadcrumb.Section>{capitalizeFirstLetter(post.title)}</Breadcrumb.Section>
                                </Breadcrumb>
                            </Grid.Column>
                        </Grid.Column>
                    </Grid.Row>
                    <h1 className='font-cinzel font-size-30'>
                            {capitalizeFirstLetter(post.title)}
                    </h1>
                    <Grid.Row>
                        <Grid.Column>
                        <Label data-tooltip="auteur" size='medium' color='teal'>
                                {post.author.username}
                        </Label>
                        <Label data-tooltip="email" size='medium' color='teal'>
                                {post.author.email}
                        </Label>
                        {post.categories.map(c => <Label key={c._id} size='medium'>{c.name}</Label>)}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className='mt-30'>
                        <Grid.Column>
                            <Segment>
                                <ReactMarkdown source={post.content} escapeHtml={false} className='font-size-20'/>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        } else {
            return <NotFound/>
        }
    }
    return <div className="ui grid centered">
        <Loader active size="massive"/>
    </div>
}