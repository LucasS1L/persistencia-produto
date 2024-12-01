import { styled } from "styled-components";




export const LogoContainer = styled.img`
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const MainContainer = styled.main`
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.paleWhite};
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    overflow: auto;
`
export const Image = styled.img`
    width: 30vw;
    height: 50vh;
    background: transparent;
`
export const Slogan = styled.p`
    padding: 1.2rem 2rem 1.2rem 0;
    font-family: "Fascinate Inline", system-ui;
    font-size: ${(props) => props.theme.fontSizes.large};
    font-weight: 400;
    font-style: normal;
`