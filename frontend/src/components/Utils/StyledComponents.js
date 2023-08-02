import Styled, { createGlobalStyle } from 'styled-components';
import { Chart } from 'react-google-charts';
import { useState } from 'react';
import { ReactComponent as DarkThemeIcon } from '../../icons/dark-theme-icon.svg';
import { ReactComponent as LightThemeIcon } from '../../icons/light-theme-icon.svg';
import { ReactComponent as EditIcon } from '../../icons/edit-icon.svg';
import { ReactComponent as SaveIcon } from '../../icons/save-icon.svg';
import { ReactComponent as CancelIcon } from '../../icons/cancel-icon.svg';

export const colorPalette = {
  light: {
    primary: '#556040',
    secondary: '#1A1A1D',
    text: '#303030',
    secondaryText: '#FAFAFA',
    accent: '#a37a49',
    background: '#FAFAFA',
    backgroundGradient: 'linear-gradient(#D6D9D2, #F3F3F3)',
    border: '#c9c9c9',
    bodyBackground: '#F3F3F3'
  },
  dark: {
    primary: '#45532D',
    secondary: '#FAFAFA',
    text: '#FAFAFA',
    secondaryText: '#303030',
    accent: '#E8A354',
    background: '#303030',
    backgroundGradient: 'linear-gradient(#1A1A1D, #303030)',
    border: '#434343',
    bodyBackground: '#303030'
  }
}

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.backgroundGradient};
    background-attachment: fixed;
  }
`

export const Background = Styled.div`
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
  align-item: stretch;
`;

export const Divider = Styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.text};
  margin: 10px;
`;

export const Heading = Styled.header`
  color: ${({ theme }) => theme.text};
  font-size: xx-large;
  font-weight: light;
  text-align: center;
  letter-spacing: 3px;
  margin: 10px;
`;

export const Subheading = Styled.header`
  color: ${({ theme }) => theme.accent};
  font-size: x-large;
  text-align: center;
  letter-spacing: 1px;
  margin: 5px;
`;

export const Container = Styled.div`
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  padding: 2vw;
  width: 30vw;
  min-width: 350px;
  border: 1px solid ${({ theme }) => theme.border};
  justify-content: center;
  border-radius: 5px;
  margin: 1vw;
  box-shadow: 0px 0px 10px #0202;
`;

export const Input = Styled.input`
  margin-top: 1.5vh;
  margin-bottom: 1.5vh;
  outline: none;
  border: none;
  padding: 1vh;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  min-height: 30px;
  width: 100%;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.background};
`;

export const Button = Styled.button`
  background-color: ${({ theme }) => theme.primary};
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  padding: 2vh;
  color: ${colorPalette.light.secondaryText};
  letter-spacing: 2px;
  margin-top: 2vh;
  margin-bottom: 2vh;
  &:hover {
    background-color: #546a26;
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
    color: ${({ theme }) => theme.accent};
  }
`;

export const Label = Styled.div`
  text-align: center;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  &:hover {
    color: ${({ theme }) => theme.accent};
  };
`

export const DarkThemeButton = Styled(DarkThemeIcon)`
  cursor: pointer;
  height: 20px;
  &:hover {
    path {
      stroke: ${({ theme }) => theme.accent};
    };
  };
`;

export const LightThemeButton = Styled(LightThemeIcon)`
  cursor: pointer;
  height: 20px;
  &:hover {
    path {
      stroke: ${({ theme }) => theme.accent};
    };
  };
`;

export const CancelButton = Styled(CancelIcon)`
  cursor: pointer;
  path {
    stroke: ${({ theme }) => theme.text};
  };
  &:hover {
    path {
      stroke: ${({ theme }) => theme.accent};
    };
  };
`;

export const EditButton = Styled(EditIcon)`
  cursor: pointer;
  path {
    stroke: ${({ theme }) => theme.text};
  };
  &:hover {
    path {
      stroke: ${({ theme }) => theme.accent};
    };
  };
`;

export const SaveButton = Styled(SaveIcon)`
  cursor: pointer;
  path {
    stroke: ${({ theme }) => theme.text};
  };
  &:hover {
    path {
      stroke: ${({ theme }) => theme.accent};
    };
  };
`;

export const Field = (props) => {
  const { name, data } = props;

  const Wrapper = Styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 5px;
    align-items: center;
  `;

  const FieldName = Styled.div`
    grid-column: 1 / 2;
    color: ${({ theme }) => theme.text};
    font-weight: bold;
    padding-left: 20px;
    letter-spacing: 0.5px;
  `;

  const FieldData = Styled.div`
    grid-column: 2 / 3;
    color: ${({ theme }) => theme.text};
  `;

  return (
    <Wrapper>
      <FieldName>{name}:</FieldName>
      <FieldData>{data? data : 'None'}</FieldData>
    </Wrapper>
  )
}

export const Table = ({ headers, rows }) => {
  const StyledTable = Styled.table`
    border: none;
  `

  const StyledTableHeader = Styled.th`
    color: ${colorPalette.light.secondaryText};
    background-color: ${({ theme }) => theme.primary};
    letter-spacing: 0.5px;
    padding: 10px;
    &:hover {
      cursor: default;
    }
  `;

  const StyledTableRow = Styled.tr`
    &:nth-child(even) {
      background-color: ${({ theme }) => theme.text}10;
    };
    &:hover {
      background-color: ${({ theme }) => theme.accent}C0;
      cursor:pointer;
      td {
        color: ${colorPalette.light.secondaryText};
      }
    };
  `;

  const StyledTableData = Styled.td`
    color: ${({ theme }) => theme.text};
    padding: 5px;
  `;

  return (
    <StyledTable>
      <StyledTableRow>
        {headers.map(header => <StyledTableHeader>{header}</StyledTableHeader>)}
      </StyledTableRow>
      {
        rows.map(row => {
          return (
            <StyledTableRow>
              {row.map(column => <StyledTableData>{column}</StyledTableData>)}
            </StyledTableRow>
          )
        })
      }
    </StyledTable>
  )
}

export const Select = ({ optionsData, placeholder, defaultValue, onBlur }) => {

  const StyledSelect = Styled.select`
    margin-top: 1.5vh;
    margin-bottom: 1.5vh;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.background};
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.border};
  `;

  const Option = Styled.option`
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.background};
  `;

  const options = optionsData.map(optionData => {
    return (
      <Option key={optionData} value={optionData}>
        {optionData}
      </Option>
    )
  });

  return (
    <StyledSelect onBlur={onBlur} defaultValue={defaultValue}>
      {options}
    </StyledSelect>
  )
}

export const PieChart = ({ data }) => {
  return (
    <Chart 
      chartType='PieChart'
      data={data}
      width='100%'
      options={{
        // pieHole: 0.5,
        pieSliceText: "label",
        is3D: false,
        height: '100%',
     
        backgroundColor: 'transparent',
        pieSliceText: 'none',
        slices: {
          0: {color: '#c62f2f'},
          1: {color: '#74542f'},
          2: {color: '#00d3ae'},
          3: {color: '#8c18c2'},
          4: {color: '#199309'}
        },
        legend: {textStyle: {
          color: '#767676',
        }},
       pieSliceBorderColor: '#76767'
      }}
    />
  )
}
