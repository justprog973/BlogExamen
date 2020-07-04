import React, {useState, useCallback} from 'react';
import './style_sign.css';
import Button from '../../elements/components/button';
import {Field} from '../../elements/ui/field';
import welcomeSvg from '../../assets/img/welcome.svg';
import {useLocalStorage} from '../../hooks/useLocalStorage';
import {usernameregex,emailregex,passwordregex} from '../../utils/regex';

export default () => {
    //HOOKS
    const [status, setStatus] = useLocalStorage('sign', true);
    const [errors, setErrors]  = useState({});
    let username              = {};
    let email                 = {};
    let password              = {};
    let confirm_password      = {};


    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const elements = e.target.elements;
        if (!usernameregex.regex.test(elements[0].value.trim())) {
            username={username: usernameregex.message};
        }else if (elements[0].value.trim() === '') {
            username={username: "Veuillez rentrer votre username"};
        }
        if (!emailregex.regex.test(elements[1].value.trim())) {
            email={email: emailregex.message};
        }else if (elements[1].value.trim() === '') {
            email={email: "Veuillez rentrer votre email."};
        }
        if (elements[2].value.trim() === '') {
            password={password: "Veuillez entrer un mot de passe"};
        } else if (!passwordregex.regex.test(elements[2].value.trim())) {
            password={password: passwordregex.message};
        } else if (elements[2].value.trim() !== elements[3].value.trim()) {
            confirm_password={confirm_password: "Votre mot de passe est différent."};
        }
        setErrors({...username,
                    ...email,...password,
                    ...confirm_password
                });
        username              = {};
        email                 = {};
        password              = {};
        confirm_password      = {};

    }, []);

    //RENDER
    return <div className="grid-container">
                <div className="illustrator">
                    <h1 className="title-sign">Story Blog </h1>
                    <p className="base-line-sign">Une nouvelle ça vous dit ?</p>
                    <div className="welcome-svg">
                        <img src={welcomeSvg} alt='welcome'/>
                    </div>
                </div>
                <div className="sign-container">
                    <div className="fieldset">
                        {status ? SignIn() : SignUp(handleSubmit, errors)}
                        <div className="form-button mb-10">
                            <Button type={'button'} width={260} height={42} br={4}
                                    onClick={() => {setStatus(!status); setErrors({});}}>{status ? "S'inscrire" : "Se connecter"}</Button>
                        </div>
                    </div>
                </div>
          </div>
}

/**
 * return the front connection
 */
const SignIn = () => {
    return <>
        <h2 className="title-fieldset-sign">Connexion</h2>
        <form action="#">
            <Field placeholder="username/email" name="username">Username</Field>
            <Field type="password" placeholder="********" name="password">Mot de passe</Field>
            <div className="form-button">
                <Button className="btn-sign-in" type={'button'} color={'#fff'} bg={'rgb(121, 183, 187)'} br={4}
                        width={260} height={42}>
                    Se connecter
                </Button>
            </div>
        </form>
     </>
}

/**
 * return the front registration
 * @param {action on submit of page} action
 * @param {error} error
 */
const SignUp = (action, error) => {

    return <>
        <h2 className="title-fieldset-register">Inscription</h2>
        <form method="post" onSubmit={action}>
            <Field name="username" border={error.username ? '1px solid red' : null}
                   error={error.username ? error.username : null}>Username</Field>
            <Field type="email" name="email" placeholder="email@exemple.com"
                   border={error.email ? '1px solid red' : null} error={error.email ? error.email : null}>Email</Field>
            <Field type="password" name="password"
                   border={error.password ? '1px solid red' : null} error={error.password ? error.password : null}>Mot
                de passe</Field>
            <Field type="password" name="confirm_password"
                   border={error.confirm_password ? '1px solid red' : null}
                   error={error.confirm_password ? error.confirm_password : null}>Confirmer le mot de passe</Field>
            <div className="form-button">
                <Button type={'submit'} color={'#fff'} bg={'rgb(121, 183, 187)'} br={4} width={260}
                        height={42}>
                    S'enregistrer
                </Button>
            </div>
        </form>
    </>;
}
