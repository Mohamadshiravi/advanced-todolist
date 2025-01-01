import mongoose from "mongoose";
import TodoUserModel from "./todo-user";
import TodoProjectModel from "./todo-project";

const TodoTodoSchema = mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  project: {
    type: mongoose.Types.ObjectId,
    ref: "TodoProject",
  },
  categori: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "TodoUser",
    required: true,
  },
});

const TodoTodoModel =
  mongoose.models.TodoTodo || mongoose.model("TodoTodo", TodoTodoSchema);
export default TodoTodoModel;
