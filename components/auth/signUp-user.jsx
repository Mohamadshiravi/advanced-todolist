"use client";

import { useEffect, useRef } from "react";
import SignUpUser from "@/utils/auth/sign-up";
import { useFormState } from "react-dom";
import FormBtn from "../module/form-btn";
import { newSucToast, newToast } from "@/utils/helper-func";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdPassword } from "react-icons/md";

export default function SignUpUserSection({ setValue }) {
  const [state, formAction] = useFormState(SignUpUser, {
    status: false,
    error: [],
  });

  const router = useRouter();

  const myForm = useRef();

  useEffect(() => {
    if (state.status) {
      newSucToast("Your account created");
      myForm.current.reset();
      router.push("/todos");
    }
  }, [state]);

  return (
    <div>
      <h3 className="mt-10 text-3xl font-bold">Sign Up</h3>
      <h3 className="mt-2 text-zinc-500 text-lg">First you need Account</h3>
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
        <FormBtn>Sign Up</FormBtn>
      </form>
      <p className="flex gap-2 text-base mt-2 text-zinc-600">
        if You Have Account
        <button
          className="text-orange-600 font-bold"
          onClick={() => {
            setValue("signin");
          }}
        >
          Sign In
        </button>
      </p>
    </div>
  );
}
