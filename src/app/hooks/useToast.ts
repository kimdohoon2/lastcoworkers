import { toast, Bounce } from 'react-toastify';

interface ToastMessage {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

const useToast = () => {
  const showToast = ({ message, type = 'warning' }: ToastMessage) => {
    toast[type](message, {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
  };

  return { showToast };
};

export default useToast;
