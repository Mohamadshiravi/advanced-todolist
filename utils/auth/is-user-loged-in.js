import { cookies } from "next/headers";
import { VerifyToken } from "./token-func";
import TodoUserModel from "@/models/todo-user";
import ConnectTODB from "@/configs/connect-to-db";

export default async function IsUserLogedIn() {
  const token = cookies().get("token")?.value;

  if (!token) {
    return false;
  }

  const verifToken = await VerifyToken(token);
  if (!verifToken) {
    return false;
  }

  ConnectTODB();

  const theUser = await TodoUserModel.findOne({ email: verifToken.email });
  if (!theUser) {
    return false;
  }

  return theUser;
}
