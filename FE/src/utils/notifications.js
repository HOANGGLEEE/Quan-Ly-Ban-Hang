import { toast } from 'react-toastify';

export const getErrorMessage = (error, fallback = 'Thao tác thất bại') =>
  error?.message || fallback;

export const notifySuccess = (message) => toast.success(message);

export const notifyError = (error, fallback) => toast.error(getErrorMessage(error, fallback));
