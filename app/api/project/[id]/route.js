import ConnectTODB from "@/configs/connect-to-db";
import TodoProjectModel from "@/models/todo-project";
import TodoTodoModel from "@/models/todo-todo";
import IsUserLogedIn from "@/utils/auth/is-user-loged-in";

export async function DELETE(req, { params }) {
  try {
    const theUser = await IsUserLogedIn();
    if (!theUser) {
      return Response.json({ m: "user unAuth" }, { status: 401 });
    }

    ConnectTODB();
    await TodoProjectModel.findOneAndDelete({ _id: params.id });
    await TodoTodoModel.findOneAndDelete({ project: params.id });
    return Response.json({ m: "project deleted" }, { status: 200 });
  } catch (error) {
    return Response.json({ m: "Error" }, { status: 500 });
  }
}
