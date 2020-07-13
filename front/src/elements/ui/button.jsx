import React from 'react';
import StyledButton from '../styled/styledButton';

const Button = ({style,...props}) => {
    return (<StyledButton style={props} {...props}>
            {props.children}</StyledButton>);
}

export function ButtonPrimary({ children, loading, type = 'button',...props}){
    if(loading){
        return <>
        <Button className="ui loading button teal" 
                type={type} color={'#fff'} 
                bg={'rgb(121, 183, 187)'} 
                br={4}
                width={260} 
                height={42} 
                {...props}
                disabled
        >
        </Button>
    </>
    }
    return <>
        <Button className="ui button teal" 
                type={type} color={'#fff'} 
                bg={'rgb(121, 183, 187)'} 
                br={4}
                width={260} 
                height={42} 
                {...props}
        >
            {children}
        </Button>
    </>
}

export function ButtonSecondary({ children, loading, loadingApi, type = 'button',...props}){
    if(loading || loadingApi){
        return <>
            <Button
                className="ui loading button" 
                type={type} 
                width={260} 
                height={42} br={4} {...props}>
            </Button>
        </>
    }
    return <>
            <Button
                className="ui button" 
                type={type} 
                width={260} 
                height={42} br={4} {...props}>
                    {children}
            </Button>
        </>
}