import { CrudService } from "./interfaces";
import { User } from "@prisma/client";
import PrismaInstance from "../prisma";

export class UserService implements CrudService {
    async get(id: string):Promise<User> {
        return await PrismaInstance.user.findUnique({
            where:{
                id:id
            }
        });        
    }

    async list(): Promise<User[]> {
        return await PrismaInstance.user.findMany();
    }

    async create(obj: User):Promise<User> {
        return await PrismaInstance.user.create({
            data:obj
        });
    }

    async update(obj: User):Promise<User> {
        return await PrismaInstance.user.update({
            where:{
                email:obj.email
            },
            data:obj
        })
    }

    async delete(id: string): Promise<void> {
        await PrismaInstance.user.delete({
            where:{
                id:id
            }
        })
    }

}