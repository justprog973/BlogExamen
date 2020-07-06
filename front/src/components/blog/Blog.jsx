//React
import React,{useEffect} from 'react';
//CSS
import './style_blog.css';
import {Select, Loader} from 'semantic-ui-react';
//Elements Perso
import Header from '../header/Header';
import {useCategories} from '../../hooks/categories';
import {usePosts} from '../../hooks/posts';
import Card from '../../elements/ui/card';


export default function Home  (){
    const {categories, fetchCategories} = useCategories();
    const {posts, fetchPosts} = usePosts();

    useEffect(()=>{
        document.title = "Story Blog | Blog";
        fetchCategories();
        fetchPosts();
    },[]);

    return (
        <React.Fragment>
            <Header/>
            <div className="ui container mt-30">
                <div className="">
                <h1>Les Articles</h1>
                <SelectCategory categories={categories}/>
                <div className="content-cards-posts">
                    <CardPost posts={posts}/>
                </div>
                </div>
            </div>
        </React.Fragment>
    );
}

const SelectCategory = function({categories}){
    let options = [{key:'all', value:'all', text: 'Categories'}];
    if(categories !== null){
        categories.forEach(c =>{
            options.push({key: c._id, value: c._id, text: c.name});
        });
    }
    return <Select placeholder="Categories" className={categories === null ? "loading" : null} options={options}/>;
}

const CardPost = function ({posts}){
    return posts === null ? <Loader active inline="centered" /> :  <Card post={posts} />;
}
