import React, {useEffect, useState} from 'react';
import {Container, Form, Grid, Icon, Label, Segment, Image, Message, Button, Modal} from 'semantic-ui-react';
import {ButtonPrimary, ButtonSecondary} from '../../elements/ui/Button';
import './style_profile.css';
import {capitalizeFirstLetter, momentFr} from "../../utils/function";
import {nameRegex, passwordRegex, usernameRegex} from "../../utils/regex";
import {useUsers} from "../../hooks/users";
import {formToJson} from "../../utils/api";
import notify from "../../utils/notify";

export default function Profile({user, action}) {
    const [errors, setErrors] = useState(null);
    const {updateUser, loading, deleteUser} = useUsers();

    useEffect(function () {
        document.title = 'Story Blog | Profile';
        window.scrollTo({top: 0, behavior: "smooth"});
    });

    const handleSubmit = function (e) {
        const form = e.target;
        let name = [];
        let username = [];
        let password = [];
        setErrors(null);


        if (!usernameRegex.regex.test(form.username.value.trim())) {
            username.push(usernameRegex.message);
            setErrors(username);
        }

        if (form.lastname.value.trim().length > 0 || form.firstname.value.trim().length > 0) {
            if ((!nameRegex.regex.test(form.lastname.value.trim()) && form.lastname.value.trim().length > 0) ||
                (!nameRegex.regex.test(form.firstname.value.trim()) && form.firstname.value.trim().length > 0)) {
                name.push(nameRegex.message);
                if (username.length === 1) {
                    setErrors([...username, ...name]);
                }
                setErrors(name);
            }
        }
        if (form.password.value.trim().length > 0) {
            if (!passwordRegex.regex.test(form.password.value.trim())) {
                password.push(passwordRegex.message);
                if (username.length === 1) {
                    setErrors([...username, ...password]);
                    if (name.length === 1) {
                        setErrors([...username, ...name, ...password]);
                    }
                } else {
                    setErrors(password);
                }
                if (name.length === 1) {
                    setErrors([...name, ...password]);
                } else {
                    setErrors(password);
                }
            } else if (form.password.value.trim() !== form.confirm_password.value.trim()) {
                password.push('Les champs mot de passe ne correspandent pas.');
                if (username.length === 1) {
                    setErrors([...username, ...password]);
                    if (name.length === 1) {
                        setErrors([...username, ...name, ...password]);
                    }
                } else {
                    setErrors(password);
                }
                if (name.length === 1) {
                    setErrors([...name, ...password]);
                } else {
                    setErrors(password);
                }
            }
        }

        if (!errors &&
            name.length === 0 &&
            username.length === 0 &&
            password.length === 0) {
            updateUser(user, formToJson(form), action);
            form.reset();
            window.scrollTo({top: 0, behavior: "smooth"});
        }
    };

    return <Container className='mb-50 ml-mr-10'>
        <h1 className='styled-title'>
            <p className='first-title'>Profile {capitalizeFirstLetter(user.username)}</p>
            <p className='second-title'>Profile {capitalizeFirstLetter(user.username)}</p>
        </h1>
        <Segment>
            {errors &&
            <Message
                error
                header='Vous avez des erreurs !'
                list={errors}
            />}
            <Grid divided="vertically" verticalAlign='middle' stackable>
                <Grid.Row columns={2}>
                    <Grid.Column computer={8} tablet={16} className="centered-img-profile">
                        <Image src={`/assets/img/undraw_profile.svg`} alt="undraw-profile"/>
                    </Grid.Column>
                    <Grid.Column computer={8} tablet={16} className="fom-index-profile">
                        <Form size='large' onSubmit={handleSubmit}>
                            <Form.Field>
                                <label>Username</label>
                                <input maxLength={10} name='username' defaultValue={capitalizeFirstLetter(user.username)}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Email</label>
                                <input name='email' defaultValue={user.email} disabled/>
                            </Form.Field>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>Nom</label>
                                    <input name='lastname' defaultValue={ user.lastname && user.lastname.toUpperCase()}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Prénom</label>
                                    <input name='firstname' defaultValue={capitalizeFirstLetter(user.firstname)}/>
                                </Form.Field>
                            </Form.Group>
                            <Form.Field className='hr-styled'>
                                <span className='color-red'>Ne pas remplire si vous ne voulez pas modifier le mot de
                                    passe <Icon name='angle down'/></span>
                            </Form.Field>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>Nouveau mot de passe</label>
                                    <input type='password' name='password'/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Confirmer mot de passe</label>
                                    <input type='password' name='confirm_password'/>
                                </Form.Field>
                            </Form.Group>
                            <Form.Field>
                                <Label size="large" className='w-100'>
                                    Date de créatation : {momentFr(user.created_at)}
                                </Label>
                            </Form.Field>
                            <Form.Field>
                                <Grid columns='equal'>
                                    <Grid.Row stretched>
                                        <Grid.Column computer={8} tablet={8} mobile={16}>
                                            <ButtonPrimary loading={loading} type='submit'
                                                           width={"100%"}>Modifier</ButtonPrimary>
                                        </Grid.Column>
                                        <Grid.Column computer={8} tablet={8} mobile={16}>
                                            <ButtonSecondary type='reset' className='mt-10-mb' width={"100%"}
                                                             onClick={() => setErrors(null)}>Reset</ButtonSecondary>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Form.Field>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2} widths='equal'>
                    <Grid.Column computer={12} mobile={16}>
                    </Grid.Column>
                    <Grid.Column computer={4} mobile={16}>
                        <Modal
                            size='mini'
                            trigger={<Button color='red' size='large' fluid className='fom-index-profile right floated btn-post-form' content='Sumprimer mon compte'/>}
                            header='SUPPRESSION'
                            content={`Voulez vous vraiment supprimer votre compte ?`}
                            actions={['NON', {
                                key: 'done', content: 'OUI', negative: true, onClick: async () => {
                                    await deleteUser(user._id, action.onConnect);
                                    notify('success','Votre compte a bien été supprimé.');
                                }
                            }]}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <div className="ui abstract">
                <img src={"/assets/img/bg.png"} alt="bg"/>
            </div>
        </Segment>
    </Container>
}