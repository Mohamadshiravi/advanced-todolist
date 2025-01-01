"use server";

import * as yup from "yup";

import ConnectTODB from "@/configs/connect-to-db";
import TodoUserModel from "@/models/todo-user";
import HashPassword from "./hash-func";
import JenerateToken from "./token-func";
import { cookies } from "next/headers";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("email is invalid")
    .required("please type your email"),
  password: yup
    .string()
    .min(8, "password must have min 8 charecter")
    .required("please type your password"),
});
export default async function SignUpUser(prewState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await schema.validate(
      { email, password },
      { abortEarly: false }
    );

    ConnectTODB();
    const isAnyUserExist = await TodoUserModel.findOne({ email });
    if (isAnyUserExist) {
      return {
        status: false,
        error: ["You have an account with this email"],
      };
    }

    const HashedPass = await HashPassword(res.password);
    const token = await JenerateToken({ email: res.email });

    await TodoUserModel.create({ email: res.email, password: HashedPass });

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
