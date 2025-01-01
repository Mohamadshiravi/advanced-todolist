import { cookies } from "next/headers";

export async function GET() {
  cookies().delete("token");
  return Response.json({ m: "user logOut" }, { status: 200 });
}
