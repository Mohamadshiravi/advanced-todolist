import mongoose from "mongoose";
import TodoUserModel from "./todo-user";

const TodoProjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#ea580c",
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "TodoUser",
  },
});

const TodoProjectModel =
  mongoose.models.TodoProject ||
  mongoose.model("TodoProject", TodoProjectSchema);
export default TodoProjectModel;
