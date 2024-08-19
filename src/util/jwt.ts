import jwt from "jsonwebtoken";
import { env } from "../env";

export function createAccessToken(user: { id: string }) {
  return jwt.sign(user, env.JWT_SECRET);
}
