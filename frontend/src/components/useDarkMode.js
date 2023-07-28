import { useContext } from 'react';
import AppContext from '../AppContext';

const useDarkMode = () => {
  const { isDarkMode } = useContext(AppContext);
  return isDarkMode;
};

export default useDarkMode;
