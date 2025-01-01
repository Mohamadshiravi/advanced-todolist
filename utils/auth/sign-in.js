"use server";

import ConnectTODB from "@/configs/connect-to-db";
import TodoUserModel from "@/models/todo-user";
import { CheckPassword } from "./hash-func";
import JenerateToken from "./token-func";
import { cookies } from "next/headers";

export default async function SignInUser(prewState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    ConnectTODB();
    const isAnyUserExist = await TodoUserModel.findOne({ email });
    if (!isAnyUserExist) {
      return {
        status: false,
        error: ["Your Account not Found"],
      };
    }

    const CheckPass = await CheckPassword(password, isAnyUserExist.password);
    if (!CheckPass) {
      return {
        status: false,
        error: ["Your password is false"],
      };
    }

    const token = await JenerateToken({ email });

    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 1000 * 168,
    });

    return {
      status: true,
      error: [],
    };
  } catch (error) {
    return {
      status: false,
      error: error.errors || [],
    };
  }
}
