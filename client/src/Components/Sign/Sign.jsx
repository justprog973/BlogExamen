import React,{useState,useCallback} from 'react';
import './StyleAccount.css';
import Button from '../../Elements/components/button';
import {Field} from '../../Elements/ui/field';
import welcomeSvg from '../../assets/img/welcome.svg';
import {formDataToJSON} from '../../utils/formData';
import {useLocalStorage} from '../../Hooks/useLocalStorage';

export default () => {
    //HOOKS
    const [status,setStatus] = useLocalStorage('sign' , true);
    const [error,setError]   = useState({});

    const handleSubmit = useCallback( async (e)=>{
        const usernameregex      =/^[a-zA-Z0-9-_]{4,10}$/;
        const mailregex          =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passwordregex      =/^(?=.*\d).{6,10}$/;
        e.preventDefault();
        const elements = e.target.elements;
        if(!usernameregex.test(elements[0].value.trim())){
            setError({ username : "entre 4 et 10  caractéres, pas de caractéres spéciaux et pas d'espace entre (ex: exA_-973)"});
            return false;
        }else if(!mailregex.test(elements[1].value.trim())){
            setError({ email : "veuillez entrez un mail valide ex : exemple@gmail.com"});
            return false;
        }
        if(elements[0].value.trim() === ''){
            setError({ username : "Veuillez rentrer votre username"});
            return false;
        }else if(elements[1].value.trim() === ''){
            setError({ email : "Veuillez rentrer votre email."});
            return false;
        }
        if(elements[2].value.trim() === ''){
            setError({ password : "Veuillez rentrer un mot de passe"});
            return false;
        }else if(!passwordregex.test(elements[2].value.trim())){
            setError({ password : "entre 6 et 10 caractéres et doit contenir au moins un chiffre."});
            return false;
        }else if(elements[2].value.trim() !== elements[3].value.trim()){
            setError({ confirm_password : "Votre mot de passe est différent."});
            return false;
        }
        const response = await fetch("http://localhost:5000/signup",{
            headers : {
                "Accept" : "apllication/json",
                "Content-Type" : "application/json"
        },
            method: "POST",
            body : formDataToJSON(e.target)
    
        });
        const responseData = await response.json();
        if(responseData.success){
            e.target.reset();
        }
        
    },[]);
    
    //RENDER
    return <div className="grid-container">
                <div className="illustrator">
                    <h1 className="title-sign">Story Blog </h1>
                    <p className="base-line-sign">Une histoire ça vous dit ?</p>
                    <div className="welcome-svg">
                        <img src={welcomeSvg} alt='welcome' />
                    </div>
                </div>
                <div className="sign-container">
                    <div className="fieldset">
                            { status ? SignIn() : SignUp(handleSubmit,error) }
                        <div className="form-button mb-10">
                            <Button type={'button'} width={260} height={42} br={4} onClick={ ()=> setStatus(!status)} >{ status ? "S'inscrire" : "Se connecter"}</Button>
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
            <Field placeholder="username/email" name="">Username</Field>
            <Field type="password" placeholder="********" name="password">Mot de passe</Field>
            <div className="form-button">
                <Button className="btn-sign-in" type={'button'} color={'#fff'} bg={'rgb(121, 183, 187)'} br={4} width={260} height={42}> 
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
            <Field name="username" placeholder="Username"  border={error.username ? '1px solid red'  : null } error={error.username ? error.username  : null }>Username</Field>
            <Field type="email" name="email" placeholder="email@exemple.com" border={error.email ? '1px solid red'  : null }  error={error.email ? error.email  : null }>Email</Field>
            <Field type="password" name="password" placeholder="********" border={error.password ? '1px solid red' : null} error={error.password ? error.password : null}>Mot de passe</Field>
            <Field type="password" name="confirm_password" placeholder="********" border={error.confirm_password ? '1px solid red' : null} error={error.confirm_password ? error.confirm_password : null}>Confirmer le mot de passe</Field>
            <div className="form-button">
                <Button type={'submit'} color={'#fff'} bg={'rgb(121, 183, 187)'} br={4} width={260}
                        height={42}>
                    S'enregistrer
                </Button>
            </div>
        </form>
    </>;
}