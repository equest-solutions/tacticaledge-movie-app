import { toast } from "react-toastify";

const notifySuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "colored",
    draggable: true,
    progress: undefined,
  });
};
const notifyInfo = (msg) =>
  toast.info(msg, {
    // icon: "🚀",
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "colored",
    draggable: true,
    progress: undefined,
  });

const notifyWarn = (msg) =>
  toast.warn(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "colored",
    draggable: true,
    progress: undefined,
  });
const notifyError = (msg) =>
  toast.error(msg, {
    // icon: "🚀",
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "colored",
    draggable: true,
    progress: undefined,
  });

export const alerts = {
  notifySuccess: notifySuccess,
  notifyInfo: notifyInfo,
  notifyWarn: notifyWarn,
  notifyError: notifyError,
};
