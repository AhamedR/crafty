import { ToastOptions, toast } from "react-toastify"

const options: ToastOptions<{}> | undefined = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: 0,
  theme: "light",
}

const notify = (message: string, status: string = 'success') => {
  if (status === 'success') {
    toast.success(message, options)
  } else if (status === 'warning') {
    toast.warning(message, options)
  } else {
    toast.error(message, options)
  }

}

export default notify