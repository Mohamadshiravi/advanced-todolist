import { compare, hash } from "bcryptjs";

export default async function HashPassword(pass) {
  const output = await hash(pass, 12);
  return output;
}
export async function CheckPassword(pass, hashedPass) {
  const output = await compare(pass, hashedPass);
  return output;
}
