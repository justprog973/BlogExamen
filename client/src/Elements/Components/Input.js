import React from 'react';

import StyledInput from '../Styled/StyledInput';


const Input = (props) =>{
    console.log(props);
    return(<StyledInput 
        style={props} 
        type={props.type} 
        placeholder={props.placeholder}
        className={props.className}
        >
    </StyledInput>);
}

export default Input;