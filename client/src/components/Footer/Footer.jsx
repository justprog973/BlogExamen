import React from 'react';
import './style_footer.css';
import {Grid, Menu, Container, Segment, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default function Footer({user}) {
    return <div className="ui vertical footer segment position-footer">
        <Container className="ml-mr-10">
            <Grid centered>
                <Grid.Row columns={2}>
                    <Grid.Column computer={8} tablet={16}>
                        <Menu size='massive' vertical fluid>
                            <Menu.Item>
                                <Menu.Header>Navigation</Menu.Header>
                                <Menu.Menu>
                                    <Menu.Item
                                        as={Link}
                                        to={'/'}
                                        name='Home'
                                    />
                                    <Menu.Item
                                        as={Link}
                                        to={'/blog'}
                                        name='Blog'
                                    />
                                    {!user ? <Menu.Item
                                        as={Link}
                                        to={'/sign'}
                                        name='Connexion'
                                    /> : <>
                                        <Menu.Item
                                            as={Link}
                                            to={'/dashboard'}
                                            name='Dashboard'
                                        />
                                        <Menu.Item
                                            as={Link}
                                            to={'/profile'}
                                            name='profile'
                                        />
                                    </>
                                    }
                                </Menu.Menu>
                            </Menu.Item>
                        </Menu>
                    </Grid.Column>
                    <Grid.Column computer={8} tablet={16}>
                        <Menu className='h-100 mt-14-mb' compact icon='labeled' widths={3}>
                            <Menu.Item
                                name='Email'
                                as={'a'}
                                href='mailto:story.blog@hotmail.fr'
                            >
                                <Icon name='mail outline'/>
                                Email
                            </Menu.Item>

                            <Menu.Item
                                name='facebook'
                                as={'a'}
                                href='http://facebook.fr/story_blog'
                                target='_blank'
                            >
                                <Icon name='facebook f'/>
                                Facebook
                            </Menu.Item>

                            <Menu.Item
                                name='instagram'
                                as={'a'}
                                href='http://instagram.com/story_blog'
                                target='_blank'
                            >
                                <Icon name='instagram'/>
                                instagram
                            </Menu.Item>
                        </Menu>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column className='line-footer'>
                        <Segment>
                            <p>2020 par JUSTPROG | &copy; tous droits réservés | <Link
                                to='/mentions-legales'>Mention Légale</Link>.</p>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    </div>
}