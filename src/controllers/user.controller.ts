import { User } from "@prisma/client";
import { UserService } from "../services/user.service";
import { Request, Response } from "express";
import httpStatus from "http-status";

const service = new UserService();

export const getAllUsers = async (req: Request, res:Response) => {

    try{
        const results:User[] = await service.list();
        if(results.length === 0) res.status(httpStatus.NOT_FOUND).end();
        res.json(results);
    }catch(e){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
    }

    res.json();
}

export const createUser = async (req:Request, res:Response) => {
    try{
        const created = await service.create(req.body as User);
        res.json(created);
    }catch(e){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
    }
}