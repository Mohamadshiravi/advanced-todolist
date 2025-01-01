import ConnectTODB from "@/configs/connect-to-db";
import TodoTodoModel from "@/models/todo-todo";
import IsUserLogedIn from "@/utils/auth/is-user-loged-in";

export async function PUT(req, { params }) {
  try {
    const theUser = await IsUserLogedIn();
    if (!theUser) {
      return Response.json({ m: "user unAuth" }, { status: 401 });
    }

    const { checked } = await req.json();

    ConnectTODB();

    await TodoTodoModel.findOneAndUpdate({ _id: params.id }, { checked });
    return Response.json({ m: "todo Updated" }, { status: 200 });
  } catch (error) {
    return Response.json({ m: "Error" }, { status: 500 });
  }
}
export async function DELETE(req, { params }) {
  try {
    const theUser = await IsUserLogedIn();
    if (!theUser) {
      return Response.json({ m: "user unAuth" }, { status: 401 });
    }

    ConnectTODB();

    await TodoTodoModel.findOneAndDelete({ _id: params.id });
    return Response.json({ m: "todo deleted" }, { status: 200 });
  } catch (error) {
    return Response.json({ m: "Error" }, { status: 500 });
  }
}
