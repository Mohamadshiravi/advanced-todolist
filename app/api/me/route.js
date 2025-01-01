import ConnectTODB from "@/configs/connect-to-db";
import TodoUserModel from "@/models/todo-user";
import { VerifyToken } from "@/utils/auth/token-func";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      return Response.json({ m: "user unauth" }, { status: 401 });
    }

    const verifToken = await VerifyToken(token);
    if (!verifToken) {
      return Response.json({ m: "user unauth" }, { status: 401 });
    }

    ConnectTODB();
    const theUser = await TodoUserModel.findOne({ email: verifToken.email });
    if (!theUser) {
      return Response.json({ m: "user unauth" }, { status: 401 });
    }

    return Response.json({ user: theUser }, { status: 200 });
  } catch (error) {
    return Response.json({ m: "Error" }, { status: 500 });
  }
}
