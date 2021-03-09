import React, {useEffect, useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import './style_dashboard.css';
import {Grid, Segment, Header, Container} from 'semantic-ui-react';
import PostForm from '../../utils/PostForm';
import {useCategories} from '../../hooks/categories';
import {usePosts} from "../../hooks/posts";
import TabPost from '../../utils/TabPost';
import CategoryForm from "../../utils/CategoryForm";
import TabCategory from "../../utils/TabCategory";
import {ButtonPrimary} from "../../elements/ui/Button";
import GestionsUsers from "../GesitonsUsers/GestionsUsers";
import {useViews} from "../../hooks/views";

export default function Dashboard({user}) {
    const {categories, fetchCategories, createCategory, deleteCategory, updateCategory, loading: loadingCategory} = useCategories();
    const {createPost, updatePost, errors, fetchPostsUser, posts, loading: loadingPost, deletePost} = usePosts();
    const [editPost, setEditPost] = useState(null);
    const [editCategory, setEditCategory] = useState(null);
    const [gestionUser, setGestionUser] = useState(false);
    const {views, viewsPost} = useViews();


    useEffect(function () {
        document.title = 'Story Blog | Dashboard';
        let mounted = true;
        if (mounted) {
            fetchCategories();
            viewsPost();
            if (user.isAdmin) {
                fetchPostsUser();
            } else {
                fetchPostsUser(user._id);
            }
        }
        return function cleanup() {
            mounted = false
        }
    }, [fetchCategories, fetchPostsUser, user._id, user.isAdmin, viewsPost]);

    return <Container className="mb-50 ml-mr-10">
        <h1 className='styled-title'>
            <p className='first-title'>Dashboard</p>
            <p className='second-title'>Dashboard</p>
        </h1>
        {
            !gestionUser ? <Grid>
                {user.isAdmin && <>
                    <Grid.Row>
                        <Grid.Column>
                            <ButtonPrimary width='150' onClick={() => setGestionUser(true)}>Gerer users</ButtonPrimary>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as="h2" className="font-cinzel" color='teal'>
                                Toutes Les categories
                            </Header>
                            <TabCategory categories={categories}
                                         actions={{delete: deleteCategory, setEditCategory: setEditCategory}}
                                         editCategory={editCategory}
                                         loadingCategory={loadingCategory}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as="h2" className="font-cinzel" color='teal'>
                                {!editCategory ? 'Creer une nouvelle catégorie' : `Vous éditez ${editCategory.name}`}
                            </Header>
                            <Segment color='teal'>
                                <CategoryForm actions={{
                                    edit: updateCategory,
                                    create: createCategory,
                                    setEditCategory: setEditCategory
                                }} editCategory={editCategory} loadingCategory={loadingCategory}/>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </>
                }
                <Grid.Row>
                    <Grid.Column>
                        <Header as="h2" className="font-cinzel" color='teal'>
                            {user.isAdmin ? 'Tous les posts' : 'Tous vos posts'}
                        </Header>
                        <TabPost posts={posts}
                                 categories={categories}
                                 actions={{edit: updatePost, delete: deletePost, setEditPost: setEditPost}}
                                 editPost={editPost}
                                 user={user}
                                 views={views}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Header as='h2' className="font-cinzel" color='teal'>
                    {editPost ? `Vous éditez ${editPost.title}` : 'Creer un nouveau post'}
                </Header>
                <Grid.Row>
                    <Grid.Column>
                        <Segment color="teal">
                            <PostForm categories={categories}
                                      errors={errors}
                                      actions={{create: createPost, edit: updatePost, setEditPost: setEditPost}}
                                      editPost={editPost}
                                      loadingPost={loadingPost}
                            />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid> : <GestionsUsers user={user} actions={{gestion: setGestionUser}}/>
        }
    </Container>
};