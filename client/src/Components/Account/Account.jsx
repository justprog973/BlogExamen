import React,{useState} from 'react';
import './StyleAccount.css';
import Button from '../../Elements/Components/Button';
import Input from '../../Elements/Components/Input';
import welcomeSvg from '../../assets/img/welcome.svg';

const Login = () => {
    const [status,setStatus] = useState(true);
    return( 
    <div className="grid-container">
        <div className="illustrator">
            <h1 className="title-login">Story Blog </h1>
            <p className="base-line-login">Une histoire ça vous dit ?</p>
            <div className="welcome-svg">
                <img src={welcomeSvg} alt='welcome' />
            </div>
        </div>
        <div className="account-container">
            <div className="fieldset">
                { status ? login() : register()}
                <div className="form-button mb-10">
                    <Button type={'button'} width={260} height={42} br={4} onClick={(e)=>{ console.log(e);
                     setStatus(!status); }} >{ status ? "S'inscrire" : "Se connecter"}</Button>
                </div>
            </div>
        </div>
    </div>
);
}

const login = () => {
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

const register = () => {
    return <>
        <h2 className="title-fieldset-register">S'inscrire</h2>
        <form action="#">
            <div className="form-group">
                <label forhtml="pseudo" >Pseudo</label>
                <Input border="1px solid lightgrey" type="text" placeholder="exemple93"
                    className="form-input"/>
                <span className="error-register"></span>
            </div>
            <div className="form-group">
                <label forhtml="email" >Email</label>
                <Input border="1px solid lightgrey" type="email" placeholder="email@exemple.fr"
                    className="form-input"/>
                <span className="error-register"></span>
            </div>
            <div className="form-group">
                <label forhtml="pwd" >Mot de passe</label>
                <Input border="1px solid lightgrey" type="password" placeholder="*******"
                    className="form-input"/>
                <span className="error-register"></span>
            </div>
            <div className="form-group">
                <label forhtml="pwd">Confirmer le mot de passe</label>
                <Input border="1px solid lightgrey" type="password" placeholder="*******"
                    className="form-input"/>
                <span className="error-register"></span>
            </div>
            <div className="form-button">
                <Button type={'button'} color={'#fff'} bg={'rgb(121, 183, 187)'} br={4} width={260}
                        height={42}>
                    S'enregistrer
                </Button>
            </div>
        </form>
    </>;
}

export default Login;