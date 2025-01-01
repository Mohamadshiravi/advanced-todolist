"use client";

import { useState } from "react";
import { SiTodoist } from "react-icons/si";
import SignUpUserSection from "@/components/auth/signUp-user";
import { ToastContainer } from "react-toastify";
import SignInUserSection from "@/components/auth/signIn-user";
import { Tab, Tabs } from "@nextui-org/react";

export default function AuthPage() {
  const [value, setValue] = useState("signup");

  return (
    <>
      <main className="flex items-center justify-center h-screen w-full md:px-0 px-8">
        <h2 className="text-orange-600 flex gap-3 items-center fixed top-4 left-4 text-4xl roboto-bold text-center">
          <SiTodoist />
          todolist
        </h2>
        <section className="md:w-[500px] w-full">
          <Tabs
            color="secondary"
            fullWidth
            selectedKey={value}
            onSelectionChange={setValue}
            variant="bordered"
            radius="sm"
          >
            <Tab key="signup" title="Sign Up" className="py-6 text-lg"></Tab>
            <Tab key="signin" title="Sign In" className="py-6 text-lg"></Tab>
          </Tabs>
          {value === "signin" && <SignInUserSection setValue={setValue} />}
          {value === "signup" && <SignUpUserSection setValue={setValue} />}
        </section>
      </main>
    </>
  );
}
