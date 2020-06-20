import React from 'react';

import StyledButton from '../Styled/StyledButton';


const Button = (props) => {
    return (<StyledButton 
            className={props.className} 
            onClick={props.onClick} 
            type={props.type} style={props} >
            {props.children}</StyledButton>);
}

export default Button;