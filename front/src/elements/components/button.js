import React from 'react';

import StyledButton from '../styled/styledButton';


const Button = ({style,...props}) => {
    return (<StyledButton style={props} {...props}>
            {props.children}</StyledButton>);
}

export default Button;