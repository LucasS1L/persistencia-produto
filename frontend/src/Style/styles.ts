import {styled} from "styled-components";


export const Header = styled.header`
    width: 80%;
    height: 5em;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.white};
    border-radius: 20px;
    overflow: auto;
    padding: 10px;
    font-family: ${(props) => props.theme.fonts.primary};
    
`