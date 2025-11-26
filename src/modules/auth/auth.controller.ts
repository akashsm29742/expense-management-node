import { HttpError } from "../../utils/http-error";
import { loginUser } from "./auth.service";
import { Request, Response } from "express";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const result = await loginUser(email, password);
  if (!result) throw new HttpError("Invalid credentials", 401);

  res.json(result);
}
