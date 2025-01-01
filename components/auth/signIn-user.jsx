"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import FormBtn from "../module/form-btn";
import { newSucToast, newToast } from "@/utils/helper-func";
import { useRouter } from "next/navigation";
import SignInUser from "@/utils/auth/sign-in";
import { Input } from "@nextui-org/react";

export default function SignInUserSection({ setValue }) {
  const [state, formAction] = useFormState(SignInUser, {
    status: false,
    error: [],
  });

  const router = useRouter();

  const myForm = useRef();

  useEffect(() => {
    if (state.status) {
      newSucToast("You Sign In to your account");
      myForm.current.reset();
      router.push("/todos");
    }
  }, [state]);

  return (
    <div>
      <h3 className="mt-10 text-3xl font-bold">Sign In</h3>
      <h3 className="mt-2 text-zinc-500 text-lg">Sign In to your account</h3>
      <form
        ref={myForm}
        action={formAction}
        className="flex flex-col gap-4 mt-8"
      >
        <Input
          name="email"
          type="email"
          variant="bordered"
          color="secondary"
          label="Email"
          radius="sm"
          className="roboto-bold"
        />
        <Input
          name="password"
          type="password"
          variant="bordered"
          color="secondary"
          label="Password"
          radius="sm"
          className="roboto-bold"
        />
        <div className="bg-orange-200 text-orange-900 px-3 rounded-md">
          {state.error.map((e, i) => (
            <p key={i} className="py-2">
              {e}
            </p>
          ))}
        </div>
        <FormBtn>Sign In</FormBtn>
      </form>
      <p className="flex gap-2 text-base mt-2 text-zinc-600">
        if You dont Have Account
        <button
          className="text-orange-600 font-bold"
          onClick={() => {
            setValue("signup");
          }}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}
