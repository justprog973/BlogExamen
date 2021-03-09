import React from 'react';
import StyledButton from '../styled/styledButton';

const Button = ({style,...props}) => {
    return (<StyledButton style={props} {...props}>
            {props.children}</StyledButton>);
}

export function ButtonPrimary({ children, loading, type = 'button', className,...props}){
    if(loading){
        return <>
        <Button className={'ui loading button teal ' + className}
                type={type}
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
        <Button className={'ui button teal ' + className}
                type={type}
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

export function ButtonSecondary({ children, loading, loadingApi, type = 'button', className,...props}){
    if(loading || loadingApi){
        return <>
            <Button
                className={'ui loading button ' + className}
                type={type} 
                width={260} 
                height={42} br={4} {...props}>
            </Button>
        </>
    }
    return <>
            <Button
                className={'ui button ' + className}
                type={type} 
                width={260} 
                height={42} br={4} {...props}>
                    {children}
            </Button>
        </>
}