import React,{useEffect, useState}    from  'react';
import 'react-quill/dist/quill.snow.css'
import './style_post.css';
import {Grid,Form, Segment, Header, Icon} from 'semantic-ui-react';
import PostForm from '../../utils/PostForm';
import {useCategories}      from '../../hooks/categories';
import {usePosts} from "../../hooks/posts";


export default function Post(){
    const {categories, fetchCategories} = useCategories();
    const {createPost, loading:loadingPost} = usePosts();

    useEffect(function() {
        fetchCategories();
    });

    return <div className="ui container">
            <Header as='h1'>
                <Icon name="newspaper" /> Post
            </Header>
            <Segment color="teal">
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                        <h2>Creer un nouveau post</h2>
                        </Grid.Column>
                    </Grid.Row>
                    <PostForm categories={categories} action={createPost} loadingPost={loadingPost} />
                </Grid>
            </Segment>
            <Grid className="mt-30">
                <Grid.Row>
                    <Grid.Column >
                            <Header as="h2">
                                <Icon name="sync"/> Post en cours
                            </Header>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
}