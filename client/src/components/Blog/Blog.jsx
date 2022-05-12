//React
import React, { useEffect, useRef, useState } from 'react';
//CSS
import './style_blog.css';
import { Loader, Menu, Container, Card, Feed, Grid } from "semantic-ui-react";
//Elements Perso
import Header from '../Header/Header';
import { useCategories } from '../../hooks/categories';
import { usePosts } from '../../hooks/posts';
import CardPost from '../../elements/ui/Card';
import Paginated from '../../utils/Paginated';
import { capitalizeFirstLetter, momentFr } from "../../utils/function";
import SelectCategory from "../../utils/SelectCategory";
import { Link } from "react-router-dom";
import { useViews } from "../../hooks/views";


export default function Blog() {
    const { categories, fetchCategories } = useCategories();
    const { posts, fetchPosts, loading: postLoading, oldPosts } = usePosts();
    const { views, viewsPost } = useViews();
    const [currentPage, setCurrentPage] = useState(1);
    const [categ, setCateg] = useState(null);
    const [oldPage, setOldPage] = useState(currentPage);
    const postsPerpage = 6;
    const mounted = useRef(true);

    const indexOfLastPost = currentPage * postsPerpage;
    const indexOfFirstPost = indexOfLastPost - postsPerpage;

    //Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    /* eslint-disable */
    useEffect(function () {
        if (mounted) {
            document.title = "Story Blog | Blog";
            fetchCategories();
            viewsPost();
            fetchPosts(categ);
        }
    }, [categ]);

    useEffect(() => {
        return () => { mounted.current = false; }
    }, []);

    return <>
        <Header />
        <Container className="mt-30 mb-50 ml-mr-10">
            <div className="content-cards-posts">
                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column>
                            <h1 className='styled-title'>
                                <p className='first-title'>Les Nouvelles</p>
                                <p className='second-title'>Les Nouvelles</p>
                            </h1>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row reversed='computer tablet' columns={2}>
                        <Grid.Column className='mb-15 p-0' computer={3} tablet={16}>
                            <SelectCategory
                                oldPage={oldPage}
                                categories={categories}
                                actions={{ filter: setCateg, page: setCurrentPage }}
                                fluid
                            />
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>Anciens posts</Card.Header>
                                </Card.Content>
                                {
                                    oldPosts && oldPosts.map((p, i) => {
                                        return <Card.Content key={i}>
                                            <Feed>
                                                <Feed.Event>
                                                    <Feed.Content>
                                                        <Feed.Date content={momentFr(p.created_at, 'time')} />
                                                        <Feed.Summary>
                                                            <Link to={`/blog/post/${p._id}`}>{p.title}</Link>
                                                        </Feed.Summary>
                                                    </Feed.Content>
                                                </Feed.Event>
                                            </Feed>
                                        </Card.Content>
                                    })
                                }
                            </Card>
                        </Grid.Column>
                        <Grid.Column computer={13} tablet={16}>
                            <CardPost posts={posts &&
                                posts.slice(indexOfFirstPost,
                                    indexOfLastPost)}
                                postLoading={postLoading}
                                views={views}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Paginated
                                totalPosts={posts && posts.length}
                                postsPerpage={postsPerpage}
                                paginate={paginate}
                                setOldPage={setOldPage}
                                currentPage={currentPage}
                                oldPage={oldPage}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </Container>
    </>
};

/**
 *
 * @param categories
 * @param setCateg
 * @param categ
 * @param paginate
 * @param currentPage
 * @returns {*}
 * @constructor
 */
function DropdownCate({ categories, setCateg, categ, setCurrentPage, oldPage, }) {

    return categories === null ? <Loader active /> :
        <Menu size='large' vertical fluid>
            <Menu.Item as='a' onClick={() => {
                setCurrentPage(oldPage);
                setCateg(null);
            }}>Catégories</Menu.Item>
            {categories.map(c => <Menu.Item
                onClick={() => {
                    setCurrentPage(1);
                    setCateg(c._id);
                }}
                active={categ === c._id}
                as='a'
                color='blue'
                key={c._id}>{capitalizeFirstLetter(c.name)}
            </Menu.Item>)}
        </Menu>;
}



