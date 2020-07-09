import React from 'react';
import { Form, Grid, Header, Button, Label, Segment, Icon} from 'semantic-ui-react';
import {ButtonPrimary} from '../../elements/ui/button';
import './style_profile.css';
import bg from '../../assets/img/bg.png';
import moment from 'moment';
moment.locale('fr');

export default function Profile({user}) {
    console.log(user);

    return <div className="ui container">
            <Header as='h2'>
                <Icon name="user circle" /> Profile de {user.username}
            </Header>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                    {user.isAdmin && <Button as="a" href="/admin" content="Admin" color="red" className="rigth floted"/>}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Segment>
               <Grid divided="vertically" verticalAlign='middle' stackable>
               <Grid.Row columns={2}>
                    <Grid.Column className="centered-img-profile">
                        <img src={`/assets/img/${user.urlAvatar}`}/>
                    </Grid.Column>
                    <Grid.Column className="fom-index-profile">
                    <Form>
                        <Form.Field>
                            <label>Username</label>
                            <input value={user.username} />
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <input value={user.email} disabled/>
                        </Form.Field>
                        <Form.Field>
                            <label>Prénom</label>
                            <input value={user.firstname}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Nom</label>
                            <input value={user.lastname}/>
                        </Form.Field>
                        <Form.Field>
                            <Label size="large">
                                Date de creatation : {moment(user.created_at).format('MM/DD/YYYY h:mm:ss')}
                            </Label>
                        </Form.Field>
                        <Form.Field>
                        <ButtonPrimary width={"100%"}>Modifier</ButtonPrimary> 
                        </Form.Field>
                    </Form>
                    </Grid.Column>
                </Grid.Row>
                </Grid>
                <div className="ui abstract">
                <img src={bg} alt="bg"/>
                </div>
            </Segment>
          </div>
}