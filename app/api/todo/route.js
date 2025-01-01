import ConnectTODB from "@/configs/connect-to-db";
import TodoTodoModel from "@/models/todo-todo";
import IsUserLogedIn from "@/utils/auth/is-user-loged-in";

export async function POST(req) {
  try {
    const { project, categori, body } = await req.json();

    const theUser = await IsUserLogedIn();
    if (!theUser) {
      return Response.json({ m: "user unAuth" }, { status: 401 });
    }

    await TodoTodoModel.create({
      project,
      categori,
      body,
      user: theUser._id,
    });
    return Response.json({ m: "todo Added" }, { status: 201 });
  } catch (error) {
    return Response.json({ m: "Error" }, { status: 500 });
  }
}
export async function GET(req) {
  try {
    const theUser = await IsUserLogedIn();
    if (!theUser) {
      return Response.json({ m: "user unAuth" }, { status: 401 });
    }

    ConnectTODB();
    const userTodo = await TodoTodoModel.find({ user: theUser._id });
    return Response.json({ data: userTodo }, { status: 200 });
  } catch (error) {
    return Response.json({ m: "Error" }, { status: 500 });
  }
}
