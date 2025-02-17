import AppMenu from "@/components/appMenu";
import IsUserLogedIn from "@/utils/auth/is-user-loged-in";
import { redirect } from "next/navigation";

export default async function AppLayout({ children }) {
  const isUser = await IsUserLogedIn();

  if (!isUser) {
    redirect("/auth");
  }
  return (
    <>
      <AppMenu />
      <main className="lg:pl-[380px] lg:pr-20">{children}</main>
    </>
  );
}
