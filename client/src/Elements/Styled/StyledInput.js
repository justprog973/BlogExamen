import Styled from 'styled-components';


const StyledInput = Styled.input`
    background-color: ${props  => props.style.bg ? props.style.bg : ''};
    width : ${props => props.style.width  ? `${props.style.width}px` : '250px'};
    height: ${props => props.style.height  ? `${props.style.height}px` : '40px'};
    border: ${props  => props.style.border ? '' : 'none'};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: ${props => props.style.br ? `${props.style.br}` :'3px'};
`;


export default StyledInput;