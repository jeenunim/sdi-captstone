import Styled from 'styled-components';
// import useDarkMode from '../useDarkMode'

export const colorPalette = {
  light: {
    primary: '#556040',
    secondary: '#1A1A1D',
    text: '#303030',
    secondaryText: '#FAFAFA',
    accent: '#AE8351',
    background: '#FAFAFA',
    backgroundGradient: 'linear-gradient(#D6D9D2, #F3F3F3)'
  },
  dark: {
    primary: '#33401C',
    secondary: '#FAFAFA',
    text: '#FAFAFA',
    secondaryText: '#303030',
    accent: '#81613C',
    background: '#303030',
    backgroundGradient: 'linear-gradient(#1A1A1D, #303030)',
  }
}
//${props => props.theme.light.backgroundGradient}
export const Background = Styled.div`
  background: ${({ theme }) => theme.backgroundGradient};
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderContainer = Styled.header`
    background-color: ${({ theme }) => theme.background};    
    color: ${({ theme }) => theme.text};
    flex-direction: row;
    align-items: center;
    height: 60px;
    box-shadow: 0px 0px 16px #0204;
    margin-bottom: 5vh;
    min-width: 100vw;
`;

export const Container = Styled.div`
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  padding: 2vw;
  width: 30vw;
  min-width: 350px;
  border: 1px solid ${({ theme }) => theme.primary};
  justify-content: center;
`;

export const Input = Styled.input`
  margin-top: 2vh;
  margin-bottom: 2vh;
  outline: none;
  border: none;
  padding: 1vh;
  border-bottom: 1px solid #D6D9D2;
  min-height: 30px;
  width: 100%;
  background-color: transparent;
`;

export const Button = Styled.button`
  background-color: ${({ theme }) => theme.primary};
  text-align: center;
  border-radius: 0.5vh;
  cursor: pointer;
  border: none;
  padding: 2vh;
  color: ${({ theme }) => theme.secondaryText};
  letter-spacing: 2px;
  margin-top: 2vh;
  margin-bottom: 2vh;
  &:hover {
    background-color: #6A7553;
  }
  min-height: 40px;
  width: 100%;
`;

export const NavItem = Styled.div`
  color: ${({ theme }) => theme.text};
  display: inline-block;
  padding: 20px;
  cursor: pointer;
  letter-spacing: 1px;
  font-weight: bold;
  border-radius: 15px;
  &:hover {
    color: ${({ theme }) => theme.accent};;
  }
`;

export const Label = Styled.div`
  text-align: center;
  cursor: pointer;
`
// export const StyledComponent = () => {
//   const isDarkMode = useDarkMode();

//   // The rest of your component logic
// };