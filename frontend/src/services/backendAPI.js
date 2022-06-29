import axios from "axios";
import { toast } from "react-toastify";

const notifySuccess = (message) => {
  toast.success(`Bravo : ${message}`);
};

const notifyError = (message) => {
  toast.error(`Erreur : ${message}`);
};

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export { instance, notifySuccess, notifyError };
