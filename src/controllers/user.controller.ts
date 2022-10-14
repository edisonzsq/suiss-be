import { User } from "@prisma/client";
import { UserService } from "../services/user.service";
import { Request, Response } from "express";

const service = new UserService();

export const getAllUsers = (req: Request, res:Response) => {
    res.json(service.list());
}

export const createUser = async (req:Request, res:Response) => {
    const created = await service.create(req.body as User);
    res.json(created);
}