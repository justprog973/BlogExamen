//React
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
//CSS
import './style_sign.css';
//Eelements Perso
import {formToJson, apiFetch} from '../../utils/api';
import {ApiErrors} from '../../utils/api';
import {ButtonPrimary, ButtonSecondary} from '../../elements/ui/Button';
import {usernameRegex, emailRegex, passwordRegex} from '../../utils/regex';
import {Button, Form, Grid, Message} from "semantic-ui-react";
import {useUsers} from "../../hooks/users";
import notify from "../../utils/notify";

/**
 * Register and connect user
 * @param {callback} onConnect
 */
export default function Sign({onConnect}) {
    //HOOKS
    const [status, setStatus] = useState(true);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [forget, setForget] = useState(false);
    const {resetPasswordUser, loading : loadingUser} = useUsers();

    //Set Title current page
    useEffect(() => {
        document.title = "Story Blog | Login";
    });

    const handlePasswordForget = async function (e) {
        const form = e.target;
        setErrors({});
        if(form.email.value.trim() !== ''){
            if(emailRegex.regex.test(form.email.value.trim())){
                const res = await resetPasswordUser(formToJson(form));
                form.reset();
                if(res.success){
                    setForget(false);
                    setStatus(true);
                }else{
                    setErrors({email : {message : res}});
                    console.log(errors);
                }
            }else{
                setErrors({email: {message: emailRegex.message}});
            }
        }else{
            setErrors({email: {message: 'Veuillez remplir le champ.'}});
        }

    };

    //Register user
    const handleSubmitSignUp = async function (e) {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        //Object for get Error
        let username = {};
        let email = {};
        let password = {};
        let confirm_password = {};

        const elements = e.target.elements;
        if (!usernameRegex.regex.test(elements[0].value.trim())) {
            username = {username: {message: usernameRegex.message}};
        } else if (elements[0].value.trim() === '') {
            username = {username: {message: "Veuillez rentrer votre username."}};
        }
        if (!emailRegex.regex.test(elements[1].value.trim())) {
            email = {email: {message: emailRegex.message}};
        } else if (elements[1].value.trim() === '') {
            email = {email: {message: "Veuillez entrer votre email."}};
        }
        if (elements[2].value.trim() === '') {
            password = {password: {message: "Veuillez entrer un mot de passe."}};
        } else if (!passwordRegex.regex.test(elements[2].value.trim())) {
            password = {password: {message: passwordRegex.message}};
        } else if (elements[2].value.trim() !== elements[3].value.trim()) {
            confirm_password = {confirm_password: {message: "Vos mot de passe est différent."}};
        }
        if (Object.entries(username).length > 0 ||
            Object.entries(password).length > 0 ||
            Object.entries(email).length > 0 ||
            Object.entries(confirm_password).length > 0) {
            setLoading(false);
            return setErrors({
                ...username,
                ...email, ...password,
                ...confirm_password
            });
        } else {
            try {
                const user = await apiFetch('register', {method: 'POST', body: formToJson(e.target)});
                setLoading(false);
                onConnect(user);
                notify('success','Vous êtes a présent connecté.');
            } catch (e) {
                if (e instanceof ApiErrors) {
                    setLoading(false);
                    setErrors(e.errors);
                } else {
                    throw e;
                }
            }
        }
    };

    //Log user 
    const handleSubmitSignIn = async function (e) {
        setErrors({});
        setLoading(true);
        e.preventDefault();
        let username = {};
        let password = {};
        const elements = e.target.elements;
        if (elements[0].value.trim() === '') {
            username = {username: {message: "Veuillez entrer votre username ou email."}};
        }
        if (elements[1].value.trim() === '') {
            password = {password: {message: "Veuillez entrer votre mot de passe."}};
        }
        if (Object.entries(username).length > 0 || Object.entries(password).length > 0) {
            setLoading(false);
            return setErrors({...username, ...password});
        } else {
            try {
                const user = await apiFetch('login', {method: 'POST', body: formToJson(e.target)});
                setLoading(false);
                await onConnect(user);
                notify('success','Vous êtes a présent connecté !')
            } catch (e) {
                if (e instanceof ApiErrors) {
                    setLoading(false);
                    return setErrors(e.errors);
                } else {
                    throw e;
                }
            }
        }
    };

    //RENDER
    return <div className="grid-container">
        <div className="illustrator">
            <h1 className="title-sign">Story Blog </h1>
            <p className="base-line-sign">Une nouvelle ça vous dit ?</p>
            <div className="welcome-svg">
                <img src="/assets/img/typewriter.svg" alt='welcome'/>
            </div>
        </div>
        <div className="sign-container">
            <div className="fieldset">
                {!forget ? status ? SignIn(handleSubmitSignIn, errors, loading)
                    : SignUp(handleSubmitSignUp, errors, loading)
                    : PasswordForget(handlePasswordForget, errors, loadingUser)}
                <Grid.Column className='mt-10'>
                    <ButtonSecondary width='100%' onClick={() => {
                        setForget(false);
                        setStatus(!status);
                        setErrors({});
                    }}>
                        {!forget ? status ? "S'inscrire" : "Connexion" : "Connexion"}
                    </ButtonSecondary>
                </Grid.Column>
                {!forget && status && <Grid.Column className='mt-10' textAlign='center'>
                    <Button size='tiny' className="link-button" onClick={(e) => {
                        setStatus(!status);
                        setForget(!forget);
                        setErrors({});
                    }}>Mot de passe oublié ?</Button>
                </Grid.Column>}
            </div>
        </div>
    </div>
}

Sign.propTypes = {
    onConnect: PropTypes.func.isRequired
};

/**
 * return front connection
 * @param {function} action
 * @param {Object} error
 * @param {Boolean} loading
 */
const SignIn = (action, error, loading) => {
    return <>
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <h2 className="title-fieldset-sign">CONNEXION</h2>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    {Object.entries(error).length !== 0 &&
                    <div className="ui error message">
                        <div className="header">
                            Vous avez des erreurs.
                        </div>
                        <ul className="list">
                            {error.username && <li>{error.username.message}</li>}
                            {error.password && <li>{error.password.message}</li>}
                            {error.errors && <li>{error.errors.message}</li>}
                        </ul>
                    </div>}
                    <Form size='large' onSubmit={action}>
                        <Form.Field>
                            <Form.Input icon='user' iconPosition='left' label='Username/Email' name='username'/>
                        </Form.Field>
                        <Form.Field>
                            <Form.Input icon='lock' iconPosition='left' label='Mot de passe' name='password'
                                        type='password'/>
                        </Form.Field>
                        <Form.Field>
                            <ButtonPrimary width='100%' type="submit" loading={loading}>Se connecter</ButtonPrimary>
                        </Form.Field>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </>
};


/**
 * return front registration
 * @param {function} action
 * @param {Object} error
 * @param loading
 */
const SignUp = (action, error, loading) => {
    return <>
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <h2 className="title-fieldset-register">INSCRIPTION</h2>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    {Object.entries(error).length !== 0 &&
                    <div className="ui error message">
                        <div className="header">
                            Vous avez des erreurs.
                        </div>
                        <ul className="list">
                            {error.username && <li>{error.username.message}</li>}
                            {error.email && <li>{error.email.message}</li>}
                            {error.password && <li>{error.password.message}</li>}
                            {error.confirm_password && <li>{error.confirm_password.message}</li>}
                            {error.message && <li>{error.message}</li>}
                        </ul>
                    </div>}
                    <Form size='large' onSubmit={action}>
                        <Form.Field>
                            <Form.Input icon='user' iconPosition='left' maxLength={10} label='Username'
                                        name='username'/>
                        </Form.Field>
                        <Form.Field>
                            <Form.Input icon='at' iconPosition='left' label='Email' name='email'/>
                        </Form.Field>
                        <Form.Field>
                            <Form.Input icon='lock' iconPosition='left' label='Mot de passe' name='password'
                                        type='password'/>
                        </Form.Field>
                        <Form.Field>
                            <Form.Input icon='lock' iconPosition='left' label='Confirmer le mot de passe'
                                        name='confirm_password' type='password'/>
                        </Form.Field>
                        <Form.Field>
                            <ButtonPrimary width='100%' type="submit" loading={loading}>S'enregister</ButtonPrimary>
                        </Form.Field>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </>
};

/**
 * return front connection
 * @param {function} action
 * @param error
 * @param loading
 */
const PasswordForget = (action, error, loading) => {
    return <>
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <h2 className="title-fieldset-sign">MOT DE PASSE OUBLIÉ</h2>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    {Object.entries(error).length !== 0 &&
                    <Message negative>
                        <Message.Header>Vous avez des erreurs !</Message.Header>
                        <ul className='list'>
                            {error.email && <li>{error.email.message}</li>}
                        </ul>
                    </Message>}
                    <Form size='large' onSubmit={action}>
                        <Form.Field>
                            <Form.Input icon='at' iconPosition='left' label='Email' name='email' type='email'/>
                        </Form.Field>
                        <Form.Field>
                            <ButtonPrimary width='100%' type="submit" loading={loading}>Rénitialiser par mail</ButtonPrimary>
                        </Form.Field>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </>
}