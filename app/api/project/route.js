import ConnectTODB from "@/configs/connect-to-db";
import TodoProjectModel from "@/models/todo-project";
import IsUserLogedIn from "@/utils/auth/is-user-loged-in";

export async function POST(req) {
  const theUser = await IsUserLogedIn();
  if (!theUser) {
    return Response.json({ m: "user unAuth" }, { status: 401 });
  }

  const { name, color } = await req.json();

  ConnectTODB();

  await TodoProjectModel.create({
    user: theUser._id,
    name,
    color,
  });
  return Response.json({ m: "ok" }, { status: 201 });
}
export async function GET(req) {
  try {
    const theUser = await IsUserLogedIn();
    if (!theUser) {
      return Response.json({ m: "user unAuth" }, { status: 401 });
    }

    ConnectTODB();
    const defProject = await TodoProjectModel.find({ user: null });
    const userProject = await TodoProjectModel.find({ user: theUser._id });
    return Response.json({ defProject, userProject }, { status: 200 });
  } catch (error) {
    return Response.json({ m: "Error" }, { status: 500 });
  }
}
