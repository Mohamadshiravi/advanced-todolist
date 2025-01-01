import mongoose from "mongoose";

export default async function ConnectTODB() {
  const uri = process.env.MONGODB_URI;
  try {
    if (mongoose.connections[0].readyState) {
      return false;
    } else {
      await mongoose.connect(uri);
    }
  } catch (e) {
    return false;
  }
}
