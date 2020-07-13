//React
import React,{useEffect,useState} from 'react';
//CSS
import './style_blog.css';
import {Select, Loader} from 'semantic-ui-react';
//Elements Perso
import Header           from '../header/Header';
import {useCategories}  from '../../hooks/categories';
import {usePosts}       from '../../hooks/posts';
import Card             from '../../elements/ui/card';
import SelectCategory   from '../../utils/SelectCategory';
import Paginated        from '../../utils/Paginated';


export default function Home  (){
    const {categories, fetchCategories} = useCategories();
    const {posts, fetchPosts} = usePosts();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerpage, setPostPerpage] = useState(6);
    useEffect(()=>{
        document.title = "Story Blog | Blog";
        fetchCategories();
        fetchPosts();
    });

    const indexOfLastPost  = currentPage * postsPerpage;
    const indexOfFirstPost = indexOfLastPost -postsPerpage;

    //Change page 
    const paginate = pageNumber => setCurrentPage(pageNumber)
    return (
        <React.Fragment>
            <Header/>
            <div className="ui container mt-30">
                <div className="">
                <h1>Les Articles</h1>
                <SelectCategory categories={categories}/>
                <div className="content-cards-posts">
                    <CardPost posts={posts && posts.slice(indexOfFirstPost, indexOfLastPost)}/>
                    <Paginated  
                        totalPosts={posts && posts.length} 
                        postsPerpage={postsPerpage}  paginate={paginate} />
                </div>
                </div>
            </div>
        </React.Fragment>
    );
}



const CardPost = function ({posts}){
    return posts === null ? <Loader active inline="centered" /> :  <Card post={posts} />;
}
