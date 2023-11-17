import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const WtpcMenu = styled.div`
    .menu-wtpc {
        height: 40px;
        font-size: 20px;
    }

    display: grid;
    height: 40px;
    gap: 5px;
    
    grid-template-rows: 100%;
    grid-template-columns: repeat(11, 44px);
`;

export const ChangeColor = keyframes`
    0% {
        background: #3498db;
    }
    25% {
        background: #5da0d4;
    }
    50% {
        background: #0000CD;
    }
    100% {
        background: #87b6e0;
    }
`;

export const Logo = styled.div`
    margin: -5px 0 0 auto;
    float: left;
    align-items: center;
    justify-content: center;
    display: grid;
`;

export const BoxLogo = styled.div`
    width: 45px;
    height: 30px;
    background: #3498db;
    margin: 10px;
    animation: ${ChangeColor} 7s infinite alternate;

    ${(props) => {
        const corAtual = getRandomColor();
        const corProxima = getRandomColor();
        const corSeguinte = getRandomColor();
        return `
          background: ${corAtual};
          animation-delay: ${Math.random()}s;
        `;
    }}
`;

function getRandomColor(): string {
    const minBlue: number = 100;
    const maxBlue: number = 255; 

    const blue: number = Math.floor(Math.random() * (maxBlue - minBlue + 1)) + minBlue;

    return `rgb(0, 0, ${blue})`;
}