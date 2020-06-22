import React from 'react';

import StyledInput from '../styled/styledInput';


const Input = ({style,...props}) =>{
    return(<StyledInput
        style={props}
        {...props} 
        >
    </StyledInput>);
}

export default Input;