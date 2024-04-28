import { ToastOptions, toast } from "react-toastify";

const toastStyle = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const toastSuccess = (text) => toast.success(text, toastStyle);
export const toastError = (text) => toast.error(text, toastStyle);
