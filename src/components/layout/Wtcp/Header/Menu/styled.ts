import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";



export const HeaderWtcpMenu = styled.div`
    width: 100%;
    display: flex;
`;

export const WtcpMenu = styled.div`
.menu-wtcp {
    font-size: 18px;
    height: 35px;
    margin: 1px;
}
    width: 500px;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    gap: 7px;
    align-items: center;
    padding: 30px 10px;
    border-bottom: 1px solid #b1b1b1;
    border-right: 1px solid #b1b1b1;
`;

export const BoxStyle = styled.div`
    width: 100%;
    background-color: #DCDCDC;
    height: 100%;
    border-radius: 7px;
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
    margin: 0 0 0 auto;
    float: left;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #b1b1b1;
    border-left: 1px solid #b1b1b1;
    
    display: flex;
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

export const InfoBox = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    padding: 15px 15px;
    justify-content: space-between;
`;

export const InfoBoxSmall = styled.div`
  width: 400px;
  height: 200px;
  border: 2px solid #e74c3c;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

// Definindo o estilo para uma caixa média
export const InfoBoxMedium = styled.div`
  width: 500px;
  height: 300px;
  border: 2px solid #2980b9
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  margin: 0px 0px 0px 0px
`;

export const InfoBoxLarge = styled.div`
  width: 600px;
  height: 400px;
  border: 2px solid #2980b9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

function getRandomColor(): string {
    const minBlue: number = 100;
    const maxBlue: number = 255; 

    const blue: number = Math.floor(Math.random() * (maxBlue - minBlue + 1)) + minBlue;

    return `rgb(0, 0, ${blue})`;
}