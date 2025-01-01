import IsUserLogedIn from "@/utils/auth/is-user-loged-in";
import { redirect } from "next/navigation";

export default async function Home() {
  const isUser = await IsUserLogedIn();
  if (!isUser) {
    redirect("/auth");
  } else {
    redirect("/todos");
  }
  return (
    <section className="bg-white dark:bg-zinc-800 w-full border-r border-zinc-200 dark:border-zinc-800 py-20 sm:px-8 px-4">
      <div>Welcome to todo</div>
    </section>
  );
}
