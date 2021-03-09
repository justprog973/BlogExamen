import React,{useEffect} from 'react';
import {Segment, Image, Grid, Container} from 'semantic-ui-react';
import {Link}   from 'react-router-dom';
import './style_home.css';

export default function Home ({user}) {
    useEffect(()=>{
        document.title = "Story Blog | Home";
    });
    window.scrollTo({top: 0, behavior: "smooth"});

    return <Container className="mb-50">
            <h1 className='styled-title'>
                <p className='first-title'>Home Story Blog</p>
                <p className='second-title'>Home Story Blog</p>
            </h1>
            <Segment>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column computer={8} tablet={16} mobile={16}>
                             <div style={{padding: '20px'}}>
                                <Image src={'assets/img/undraw_reading_book.svg'} alt='Book' rounded/>
                             </div>
                        </Grid.Column>
                        <Grid.Column computer={8} tablet={16} mobile={16}>
                        <h2 className='title-intro'>Bienvenue</h2>
                            <p className='intro'>
                                <span className='name-blog'>Story Blog</span> vous présente un blog destiné au passionné de littérature et où pour tout ceux qui souhaite
                                s'exprimer dans l'un des plus beau façon de le faire par &laquo; l'écriture &raquo;.
                                Le contenu est disponible pour tout le monde mais si tu souhaites libérer ton imagination fantasque{
                                !user ? <><Link to={'/login'}> inscrit</Link> toi !</> : <> fait un <Link to={'/dashboard'}>post</Link>.</>}
                            </p>
                            <p className="intro mt-5">
                                Notre blog se veut être libre aucune censure, 
                                proche de nos utilisateurs alors si vous avez des suggestions
                                sur les fonctionalités que vous voudriez voir apparaître n'hésitez pas a nous le faire savoir en nous contactant par
                                mail <a href='mailto:story.blog@hotmail.fr'>Ici</a>.
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
}