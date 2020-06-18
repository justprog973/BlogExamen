import React from 'react';
import './StyleLogin.css';
import Button from '../../Elements/Components/Button';
import Input from '../../Elements/Components/Input';
import welcomSvg from '../../assets/img/welcome.svg';

const Login = () => {
    return( 
    <div className="grid-container">
    <div className="illustrator">
        <h1>Aside Blog </h1>
        <p>Discutons de tout et de rien ...</p>
        <div className="welcome-svg">
            <img src={welcomSvg} alt='welcome' />
        </div>
    </div>
    <div className="login">
        <div className="fieldset">
            <h2>Log In</h2>
                <form>
                    <div className="form-group">
                        <label>Pseudo</label>
                        <Input 
                            type="text" 
                            border={false} 
                            placeholder="Pseudo/email" 
                            class="form-input"
                            
                        >
                        </Input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <Input 
                            type="password" 
                            border={false} 
                            placeholder="Password" 
                            className="form-input"
                            
                        >
                        </Input>
                    </div>
                    <div className="form-button">
                    <Button 
                        type={'button'} 
                        color={'#fff'}
                        bg={'rgb(121, 183, 187)'}
                        br={3}
                        width={260}
                        height={42}
                    > 
                        sing in 
                    </Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);
}

export default Login;