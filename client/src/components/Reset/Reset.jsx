import React, {useEffect, useState} from 'react';
import { useHistory, useParams} from "react-router-dom";
import {Container, Form, Grid, Image, Loader, Message, Segment} from "semantic-ui-react";
import {ButtonPrimary} from "../../elements/ui/Button";
import {useUsers} from "../../hooks/users";
import {passwordRegex} from "../../utils/regex";
import NotFound from "../NotFound/NotFound";
import {formToJson} from "../../utils/api";

export default function Reset() {
    const {id} = useParams();
    let history = useHistory();
    const {forgetUser, checkToken, loading, users} = useUsers();
    const [errors, setErrors] = useState({});

    /* eslint-disable */
    useEffect(function () {
        checkToken(id);
    },[]);

    const handleResetPassword = async function (e) {
        const form = e.target;
        const password = form.password.value.trim();
        const confirm_password = form.confirm_password.value.trim();
        setErrors({});

        if (passwordRegex.regex.test(password)) {
            if (password === confirm_password) {
                await forgetUser(id,formToJson(form));
                return history.push("/login");
            } else {
                setErrors({password: {message: 'Vos mots de passe sont différent.'}});
            }
        } else {
            setErrors({password: {message: passwordRegex.message}});
        }
    };

    if(!loading){
        if(users){
            return <Container className='mb-50'>
                <h1 className='styled-title'>
                    <p className='first-title'>Rénitialiser</p>
                    <p className='second-title'>Rénitialiser</p>
                </h1>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Grid as={Segment}>
                                <Grid.Row columns={2} verticalAlign='middle'>
                                    <Grid.Column className='mb-mb-10' computer={8} tablet={16}>
                                        <Image centered size='big' src='/assets/img/book.svg' alt='reset'/>
                                    </Grid.Column>
                                    <Grid.Column computer={8} tablet={16}>
                                        {Object.entries(errors).length !== 0 && <Message negative>
                                            <Message.Header>Vous avez des erreurs !</Message.Header>
                                            <p>{errors.password.message}</p>
                                        </Message>
                                        }
                                        <Form size='large' onSubmit={handleResetPassword}>
                                            <Form.Field>
                                                <Form.Input label='Nouveau mot de passe' type='password' name='password'/>
                                            </Form.Field>
                                            <Form.Field>
                                                <Form.Input label='Confirmer mot de passe' type='password'
                                                            name='confirm_password'/>
                                            </Form.Field>
                                            <Form.Field>
                                                <ButtonPrimary type='submit' width='100%'>Changer</ButtonPrimary>
                                            </Form.Field>
                                        </Form>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        }else{
            return <NotFound/>;
        }
    }
    return <div className="ui grid centered">
        <Loader active size="massive"/>
    </div>
};