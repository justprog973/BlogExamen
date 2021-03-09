import React from 'react';
import {Container, Grid, Image} from "semantic-ui-react";


export default function NotFound() {
    return  <Container className='mb-50'>
                <h1 className='styled-title'>
                    <p className='first-title'>Page Not Found</p>
                    <p className='second-title'>Page Not Found</p>
                </h1>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Image src='/assets/img/not_found.svg' alt='not_found'/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
};