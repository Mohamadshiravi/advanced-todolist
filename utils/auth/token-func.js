import { sign, verify } from "jsonwebtoken";

export default async function JenerateToken(email) {
  const token = sign({ ...email }, process.env.TOKEN_KEY, {
    expiresIn: "168h",
  });
  return token;
}
export async function VerifyToken(token) {
  try {
    const input = verify(token, process.env.TOKEN_KEY);
    return input;
  } catch (error) {
    return false;
  }
}
