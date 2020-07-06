import  Styled from 'styled-components';

const StyledButton = Styled.button`
    background-color: ${props  => `${props.style.bg} !important` ? props.style.bg : ''};
    border: ${props  => props.style.border ? '' : 'none'};
    color : ${props  => props.style.color ? props.style.color : '#3A3A3A !important'};
    height: ${props  => props.style.height ? `${props.style.height}px` : '30px'};
    width : ${props  => props.style.width ? `${props.style.width}px` : '100px'};
    border-radius: ${props  =>  props.style.br ? `${props.style.br}px` : ''};
    font-size: 14px;
`

export default StyledButton;

