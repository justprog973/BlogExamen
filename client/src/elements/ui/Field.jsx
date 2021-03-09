import React from 'react';
import StyledInput from '../styled/styledInput';
import './uiStyle.css';

const Input = ({style,...props}) =>{
    return(<StyledInput
        style={props}
        {...props} 
        >
    </StyledInput>);
}

export function Field ({name, children, type = 'text', error, ...props}) {
    let input = null;
    switch (type) {
        case 'textarea' : input = <Input name={name}  type="textarea"  className="form-input" {...props}/>
        break;
        case 'password' : input = <Input name={name} type="password"  className="form-input" {...props}/>
        break;
        case 'email' : input = <Input name={name} type="email"  className="form-input" {...props}/>
        break;
        default: input = <Input name={name}  type="text" className="form-input" {...props}/>
    }
        return <div className="form-group">
                    <label forhtml={name} >{children}</label>
                    {input}
                    <div className="error-user">{error ? error : null }</div>
               </div>
}