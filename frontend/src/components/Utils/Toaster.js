import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import AppContext from "../../AppContext";

export const notify = (message, type, position='top-center') => {
  const settings = {
    position: position,
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  }

  if (type === undefined) {
    toast(message, settings);
  } else if (type === 'error') {
    toast.error('Invalid Login', settings); //is stinky
  } else if (type === 'success') {
    toast.success(message, settings);
  }
} 

const Toaster = () => {
  const { isDarkMode } = useContext(AppContext);
  return (<ToastContainer
    position="bottom-right"
    autoClose={2500}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable={false}
    pauseOnHover
    theme={isDarkMode ? 'dark' : 'light'}
  />);
}

export default Toaster;