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
    bodyBackground: '#F3F3F3',
    backgroundImage: `url('https://media.defense.gov/2020/Dec/10/2002550183/-1/-1/0/201210-F-GY993-002.JPG')`
  },
  dark: {
    primary: '#45532D',
    secondary: '#FAFAFA',
    text: '#FAFAFA',
    secondaryText: '#303030',
    accent: '#E8A354',
    background: '#101010',
    backgroundGradient: 'linear-gradient(#1A1A1D, #303030)',
    border: '#434343',
    bodyBackground: '#303030',
    backgroundImage: `url('https://wallpapercrafter.com/sizes/1920x1080/285766-us-army-soldiers-army-men-waiting-aircraft.jpg')`
  }
}

export const GlobalStyle = createGlobalStyle`
  body {

    background: ${({ theme }) => theme.backgroundImage};
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
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
  transition: all 1s;
  background-color: ${({ theme }) => theme.background};    
  color: ${({ theme }) => theme.text};
  flex-direction: row;
  align-items: center;
  height: 60px;
  box-shadow: 0px 0px 16px #0008;
  margin-bottom: 5vh;
  min-width: 100vw;
  align-item: stretch;
`;

export const Divider = Styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.text};
  margin: 10px;
`;

export const Heading = Styled.header`
  transition: all 1s;
  color: ${({ theme }) => theme.text};
  font-size: xx-large;
  font-weight: light;
  text-align: center;
  letter-spacing: 3px;
  margin: 10px;
`;

export const Subheading = Styled.header`
  transition: all 1s;
  color: ${({ theme }) => theme.accent};
  font-size: x-large;
  text-align: center;
  letter-spacing: 1px;
  margin: 5px;
`;

export const Container = Styled.div`
  transition: all 1s;
  background-color: ${({ theme }) => theme.background}E0;
  display: flex;
  flex-direction: column;
  padding: 2vw;
  width: 30vw;
  min-width: 350px;
  border: 1px solid ${({ theme }) => theme.border};
  justify-content: center;
  border-radius: 5px;
  margin: 1vw;
  box-shadow: 0px 0px 10px #0006;
  backdrop-filter: blur(15px);
`;

export const Input = Styled.input`
  transition: all 1s;
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
  border-radius: 10px;
  `;

export const Button = Styled.button`
  transition: all 1s;
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
  transition: all 0.25s; 
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
  transition: all 1s;
  text-align: center;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  &:hover {
    color: ${({ theme }) => theme.accent};
  };
`

export const DarkThemeButton = Styled(DarkThemeIcon)`
  transition: all 1s;
  cursor: pointer;
  height: 20px;
  &:hover {
    path {
      stroke: ${({ theme }) => theme.accent};
    };
  };
`;

export const LightThemeButton = Styled(LightThemeIcon)`
  transition: all 1s;
  cursor: pointer;
  height: 20px;
  &:hover {
    path {
      stroke: ${({ theme }) => theme.accent};
    };
  };
`;

export const CancelButton = Styled(CancelIcon)`
  transition: all 1s;
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
  transition: all 1s;
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
  transition: all 1s;
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
    transition: all 1s;
    grid-column: 1 / 2;
    color: ${({ theme }) => theme.text};
    font-weight: bold;
    padding-left: 20px;
    letter-spacing: 0.5px;
  `;

  const FieldData = Styled.div`
    transition: all 1s;
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

export const Table = ({ headers, rows, onClick }) => {
  const StyledTable = Styled.table`
    border: none;
  `

  const StyledTableHeader = Styled.th`
    transition: all 1s;
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

  const filteredHeaders = headers.slice(1);

  return (
    <StyledTable>
      {/* Render headers without the first (id) column */}
      <StyledTableRow>
        {filteredHeaders.map(header => <StyledTableHeader key={header}>{header}</StyledTableHeader>)}
      </StyledTableRow>
      {
        rows.map((row, rowIndex) => {
          // Extract the id from the row data (assuming id is the first element in the row)
          const id = row[0];
          // Remove the first element (id) from the row array
          const filteredRow = row.slice(1);
          return (
            // Attach the onRowClick event to each row individually
            <StyledTableRow key={rowIndex} onClick={() => onClick(id)}>
              {filteredRow.map((column, columnIndex) => <StyledTableData key={columnIndex}>{column}</StyledTableData>)}
            </StyledTableRow>
          )
        })
      }
    </StyledTable>
  )
}

export const Select = ({ optionsData, placeholder, defaultValue, onBlur }) => {

  console.log('DefaulValue:', placeholder, ': ', defaultValue);

  const StyledSelect = Styled.select`
    margin-top: 1.5vh;
    margin-bottom: 1.5vh;
    padding: 10px;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.background};
    border-radius: 10px;
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
