import { toast } from "react-toastify";

const notifySuccess = (message) => {
  toast.success(`Great : ${message}`);
};

const notifyError = (message) => {
  toast.error(`Error : ${message}`);
};

export { notifySuccess, notifyError };
