import React, {useEffect, useState} from 'react';
import 'react-quill/dist/quill.snow.css'
import './style_post.css';
import {Grid, Segment, Header} from 'semantic-ui-react';
import PostForm from '../../utils/PostForm';
import {useCategories}      from '../../hooks/categories';
import {usePosts} from "../../hooks/posts";
import TabPost from '../../elements/ui/TabPost';

export default function Post({user}){
    const {categories, fetchCategories} = useCategories();
    const {createPost, updatePost, errors, fetchPostsUser, posts, loading: loadingPost,deletePost} = usePosts();
    const [editPost, setEditPost] = useState(null);

    useEffect(function() {
        fetchCategories();
        fetchPostsUser(user._id);
    },[fetchCategories,fetchPostsUser,user._id]);

    return <div className="ui container">
            <Grid className="mt-30 font-montserrat">
                <Grid.Row>
                    <Grid.Column >
                        <Header as="h2" className="font-cinzel">
                            Tous vos postes
                        </Header>
                        <TabPost posts         ={posts}
                                 categories    ={categories}
                                 loading       ={loadingPost}
                                 deletePost    ={deletePost}
                                 setEditPost   ={setEditPost}
                                 editPost      ={editPost}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Header as='h2' className="font-cinzel">
                { editPost ? `Vous éditez ${editPost.title}` : 'Creer un nouveau post'}
            </Header>
            <Segment color="teal">
                <Grid>
                    <PostForm categories    ={categories}
                              errors        ={errors}
                              action        ={{create: createPost, edit: updatePost}}
                              editPost      ={editPost}
                              setEditPost   ={setEditPost}
                    />
                </Grid>
            </Segment>
        </div>
}