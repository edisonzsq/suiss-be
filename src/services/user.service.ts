import { CrudService } from "./interfaces";
import { User } from "@prisma/client";
import PrismaInstance from "../databases";

export class UserService implements CrudService {
    async get(id: string):Promise<User> {

        try{
            return await PrismaInstance.user.findUnique({
                where:{
                    id:id
                }
            });   
        }catch(e){
            throw `Unable to get user id ${id}`;
        }
             
    }

    async list(): Promise<User[]> {
        try{
            return await PrismaInstance.user.findMany();
        }catch(e){
            throw `Unable to list users`;
        }
        
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