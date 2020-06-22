import React,{useState,useEffect,useCallback} from 'react';
import './StyleAccount.css';
import Button from '../../Elements/Components/Button';
import Input from '../../Elements/Components/Input';
import welcomeSvg from '../../assets/img/welcome.svg';
import {formDataToJSON} from '../../utils/formData';

export default () => {
    const [status,setStatus] = useState(true);
    const handleSubmit = useCallback( async (e)=>{
        e.preventDefault();
        await fetch("http://localhost:5000/register",{
            headers : {
                "Accept" : "apllication/json",
                "Content-Type" : "application/json"
        },
            method: "POST",
            body : formDataToJSON(e.target)
    
        });
    });
    return <div className="grid-container">
                <div className="illustrator">
                    <h1 className="title-login">Story Blog </h1>
                    <p className="base-line-login">Une histoire ça vous dit ?</p>
                    <div className="welcome-svg">
                        <img src={welcomeSvg} alt='welcome' />
                    </div>
                </div>
                <div className="account-container">
                    <div className="fieldset">
                        { status ? Login() : Register(handleSubmit) }
                        <div className="form-button mb-10">
                            <Button type={'button'} width={260} height={42} br={4} onClick={()=>{
                            setStatus(!status); }} >{ status ? "S'inscrire" : "Se connecter"}</Button>
                        </div>
                    </div>
                </div>
          </div>
}

const Login = () => {
    return <>
        <h2 className="title-fieldset-login">Connexion</h2>
        <form action="#">
            <div className="form-group">
                <label forhtml="pseudo" >Pseudo</label>
                <Input border="1px solid lightgrey" type="text" placeholder="Pseudo/email" className="form-input"/>
                <span className="error-login"></span>
            </div>
            <div className="form-group">
                <label forhtml="pwd" >Mot de passe</label>
                <Input border="1px solid lightgrey" type="password" placeholder="Password" className="form-input"/>
                <span className="error-login"></span>
            </div>
            <div className="form-button">
                <Button className="btn-login" type={'button'} color={'#fff'} bg={'rgb(121, 183, 187)'} br={4} width={260} height={42}> 
                    Se connecter
                </Button>
            </div>
        </form>
    </>
}

const Register = (action) => {

    return <>
        <h2 className="title-fieldset-register">Inscription</h2>
        <form method="post" onSubmit={action}>
            <div className="form-group">
                <label forhtml="pseudo" >Pseudo</label>
                <Input name="username" border="1px solid lightgrey" type="text" placeholder="exemple93"
                    className="form-input"/>
                <span className="error-register"></span>
            </div>
            <div className="form-group">
                <label forhtml="email" >Email</label>
                <Input name="email" border="1px solid lightgrey" type="email" placeholder="email@exemple.fr"
                    className="form-input"/>
                <span className="error-register"></span>
            </div>
            <div className="form-group">
                <label forhtml="pwd" >Mot de passe</label>
                <Input name="password" border="1px solid lightgrey" type="password" placeholder="*******"
                    className="form-input"/>
                <span className="error-register"></span>
            </div>
            <div className="form-group">
                <label forhtml="pwd">Confirmer le mot de passe</label>
                <Input name="confirm_password" border="1px solid lightgrey" type="password" placeholder="*******"
                    className="form-input"/>
                <span className="error-register"></span>
            </div>
            <div className="form-button">
                <Button loading={true} type={'submit'} color={'#fff'} bg={'rgb(121, 183, 187)'} br={4} width={260}
                        height={42}>
                    S'enregistrer
                </Button>
            </div>
        </form>
    </>;
}