import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    toast.error(message, settings);
  } else if (type === 'success') {
    toast.success(message, settings);
  }
} 

const Toaster = () => {
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
    theme="light"
  />);
}

export default Toaster;