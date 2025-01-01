import mongoose from "mongoose";

const TodoUserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const TodoUserModel =
  mongoose.models.TodoUser || mongoose.model("TodoUser", TodoUserSchema);
export default TodoUserModel;
