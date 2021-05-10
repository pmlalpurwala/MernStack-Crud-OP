import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
        margin:0;
        padding:0;
        box-sizing:border-box;
    }
    html {
        &::-webkit-scrollbar{
            width:0.5rem;
        }
        &::-webkit-scrollbar-thumb {
            background-color: darkgray;
        }
        &::-webkit-scrollbar-track {
            background: white;
        }
    }
    body {
        font-family: 'Lora';
        width:100%;
    }
    h2 {
        font-size: 4rem;
        font-family:'Merriweather';
        font-weight: normal;
        color: #333;
    }
    h3 {
        font-size:1.3rem;
        color:#333;
        padding:1.5rem 0rem;
    }
    p{
        font-size:1.2rem;
        line-height: 200%;
        color: #696969;
    }
    a{
        text-decoration: none;
        color:#333;
    }
    img {
        display: flex;
    }
    input {
        font-weight: bold;
        font-family:'Merriweather';
    }
`;

export default GlobalStyle;