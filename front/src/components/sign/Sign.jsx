//React
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
//CSS
import './style_sign.css';
//Eelements Perso
import {Field} from '../../elements/ui/field';
import {fromToJson,apiFetch} from '../../utils/api';
import {useLocalStorage} from '../../hooks/useLocalStorage';
import {ApiErrors} from '../../utils/api';
import {ButtonPrimary, ButtonSecondary} from '../../elements/ui/button';
import {usernameregex,emailregex,passwordregex} from '../../utils/regex';

/**
 * Register and connect user
 * @param {callback} onConnect 
 */
export default function Sign ({onConnect}) {
    //HOOKS
    const [status, setStatus] = useLocalStorage('sign', true);
    const [errors, setErrors]  = useState({});
    const [loading, setLoading] = useState(false);

    //Set Title current page
    useEffect(() =>{
        document.title = "Story Blog | Sign";
    });

    //Register user
    const handleSubmitSignUp = async function(e) {
        e.preventDefault();
        setLoading(true);

        //Object for get Error
        let username              = {};
        let email                 = {};
        let password              = {};
        let confirm_password      = {};

        const elements = e.target.elements;
        if (!usernameregex.regex.test(elements[0].value.trim())) {
            username={username:{message: usernameregex.message}};
        }else if (elements[0].value.trim() === '') {
            username={username:{message: "Veuillez rentrer votre username."}};
        }
        if (!emailregex.regex.test(elements[1].value.trim())) {
            email={email: {message : emailregex.message}};
        }else if (elements[1].value.trim() === '') {
            email={email:{message: "Veuillez entrer votre email."} };
        }
        if (elements[2].value.trim() === '') {
            password={password: {message: "Veuillez entrer un mot de passe."}};
        } else if (!passwordregex.regex.test(elements[2].value.trim())) {
            password={password: {message: passwordregex.message}};
        } else if (elements[2].value.trim() !== elements[3].value.trim()) {
            confirm_password={confirm_password: "Votre mot de passe est différent."};
        }
        if(Object.entries(username).length > 0 || 
            Object.entries(password).length > 0 ||
            Object.entries(email).length > 0 || 
            Object.entries(confirm_password).length > 0){
                setLoading(false);
                return setErrors({...username, 
                    ...email,...password,
                    ...confirm_password
                });
        }else{
            try{
                await apiFetch('register',{method: 'POST', body: fromToJson(e.target)});
                setLoading(false);
                return setStatus(true);
            }catch(e){
                if(e instanceof ApiErrors){
                    setLoading(false);
                    return setErrors(e.errors);
                }else{
                    console.log(e);
                }
            }
        }
        
        setLoading(false);  

    };

    //Log user 
    const handleSubmitSignIn = async function (e){
        setErrors({});
        setLoading(true);
        e.preventDefault();
        let username              = {};
        let password              = {};
        const elements = e.target.elements;
        if (elements[0].value.trim() === '') {
            username={username:{message: "Veuillez entrer votre username ou email."}};
        }
        if (elements[1].value.trim() === '') {
            password={password:{message: "Veuillez entrer votre mot de passe."}};
        }
        if(Object.entries(username).length > 0 || Object.entries(password).length > 0) {
            setLoading(false);
            return setErrors({...username,...password});
        }else{
            try{
                const user = await apiFetch('login',{method: 'POST', body: fromToJson(e.target)});
                setLoading(false);
                return await onConnect(user);
             }catch(e){
                 if(e instanceof ApiErrors){
                     setLoading(false);
                     return setErrors(e.errors);
                 }else{
                     console.log(e);
                 }
             }
        }
        setLoading(false);
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
                        {status ? SignIn(handleSubmitSignIn, errors, loading) : SignUp(handleSubmitSignUp, errors, loading)}
                        <div className="form-button mb-10">
                            <ButtonSecondary onClick={() => {setStatus(!status); setErrors({});}}>
                                {status ? "S'inscrire" : "Se connecter"}
                            </ButtonSecondary>
                        </div>
                    </div>
                </div>
            </div>
}

Sign.propTypes = {
    onConnect: PropTypes.func.isRequired
}

/**
 * return front connection
 * @param {function} action 
 * @param {Object} error 
 * @param {Boolean} loading 
 */
const SignIn = (action, error, loading) => {
    return <>
        <h2 className="title-fieldset-sign">Connexion</h2>
        <form onSubmit={action}>
            {/* username/email */}
            <Field placeholder="username/email" 
            name="username" border={error.username ? '1px solid red' : null} 
            error={error.username ? error.username.message : null}>Username
            </Field>
            {/* password */}
            <Field placeholder="***********" type="password" 
            name="password" border={error.password ? '1px solid red' : null} 
            error={error.password ? error.password.message : null}>Mot de passe
            </Field>
            <div className="form-button">
                <ButtonPrimary type="submit" loading={loading}>Se connecter</ButtonPrimary> 
            </div>
        </form>
     </>
}


/**
 * return front registration
 * @param {function} action
 * @param {Object} error
 */
const SignUp = (action, error, loading) => {
    return <>
        <h2 className="title-fieldset-register">Inscription</h2>
        <form method="post" onSubmit={action}>
            {/* username */}
            <Field placeholder="username" 
            name="username" 
            border={error.username ? '1px solid red' : null}
            error={error.username ? error.username.message : null}>Username
            </Field>
            {/* email */}
            <Field type="email" 
            name="email" placeholder="email@exemple.com"
            border={error.email ? '1px solid red' : null} 
            error={error.email ? error.email.message : null}>Email
            </Field>
            {/* password */}
            <Field placeholder="***********" type="password" 
            name="password"
            border={error.password ? '1px solid red' : null} 
            error={error.password ? error.password.message : null}>Motde passe
            </Field>
            {/* confirm_password */}
            <Field placeholder="***********" type="password" 
            name="confirm_password"
            border={error.confirm_password ? '1px solid red' : null}
            error={error.confirm_password ? error.confirm_password : null}>Confirmer le mot de passe
            </Field>
            <div className="form-button">
                <ButtonPrimary type="submit" loading={loading}>S'enregister</ButtonPrimary>
            </div>
        </form>
    </>
}

