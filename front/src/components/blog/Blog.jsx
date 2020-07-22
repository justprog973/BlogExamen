//React
import React, {useEffect, useState} from 'react';
//CSS
import './style_blog.css';
import {Loader, Menu, Grid} from "semantic-ui-react";
//Elements Perso
import Header from '../header/Header';
import {useCategories} from '../../hooks/categories';
import {usePosts} from '../../hooks/posts';
import CardPost from '../../elements/ui/Card';
import Paginated from '../../utils/Paginated';
import {useLocalStorage} from "../../hooks/useLocalStorage";
import {capitalizeFirstLetter} from "../../utils/function";


export default function Home() {
    const {categories, fetchCategories} = useCategories();
    const {posts, fetchPosts, loading: postLoading} = usePosts();
    const [currentPage, setCurrentPage] = useState(1);
    const [categ, setCateg] = useLocalStorage('categ', '');
    const postsPerpage = 6;
    const [oldPage, setOldPage] = useState(currentPage);

    const indexOfLastPost = currentPage * postsPerpage;
    const indexOfFirstPost = indexOfLastPost - postsPerpage;

    //Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        document.title = "Story Blog | Blog";
    });
    /* eslint-disable */
    useEffect(() => {
        fetchCategories();
        fetchPosts(categ);
    }, [categ]);

    return (
        <React.Fragment>
            <Header/>
            <div className="ui container mt-30">
                <div className="">
                    <h1>Les novelles </h1>
                    <div className="content-cards-posts">
                        <Grid reversed='computer tablet' stackable>
                            <Grid.Row columns={2}>
                                <Grid.Column computer={3} tablet={6} mobile={16}>
                                    <DropdownCate
                                        categories={categories}
                                        setCateg={setCateg}
                                        categ={categ}
                                        setCurrentPage={setCurrentPage}
                                        oldPage={oldPage}
                                    />
                                </Grid.Column>
                                <Grid.Column computer={13} tablet={10} mobile={16}>
                                    <CardPost posts={posts &&
                                    posts.slice(indexOfFirstPost,
                                    indexOfLastPost)}
                                    postLoading={postLoading}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Paginated
                            totalPosts={posts && posts.length}
                            postsPerpage={postsPerpage}
                            paginate={paginate}
                            setOldPage={setOldPage}
                            currentPage={currentPage}
                            oldPage={oldPage}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
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
function DropdownCate({categories, setCateg, categ, setCurrentPage, oldPage, }) {

    return categories === null ? <Loader active/> :
        <Menu size='large' vertical fluid>
            <Menu.Item as='a' onClick={() => { setCurrentPage(oldPage); setCateg(null); }}>Catégories</Menu.Item>
            {categories.map(c => <Menu.Item
                onClick={() => {setCurrentPage(1); setCateg(c._id);}}
                active={categ === c._id}
                as='a'
                color='blue'
                key={c._id}>{capitalizeFirstLetter(c.name)}
            </Menu.Item>)}
        </Menu>;
}



