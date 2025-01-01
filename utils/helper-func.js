import { toast } from "react-toastify";
import swal from "sweetalert";

export function newErrorToast(text) {
  return toast.error(text, { theme: "colored", position: "top-left" });
}
export function newToast(text) {
  return toast(text, { theme: "colored", position: "top-left" });
}
export function newSucToast(text) {
  return toast.success(text, {
    theme: "colored",
    position: "top-left",
    autoClose: 3000,
  });
}
export async function ShowSwal(icon, title, button) {
  return swal({
    icon,
    title,
    buttons: button,
  });
}
