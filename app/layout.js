import "@/style/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "./provider";

export const metadata = {
  title: "todolist",
  description: "write your todo",
  icons: {
    icon: "/site-img/R.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`roboto-regular bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-white select-none`}
      >
        <Providers>{children}</Providers>
        <ToastContainer stacked />
      </body>
    </html>
  );
}
