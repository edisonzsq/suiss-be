export interface CrudService {

    list():Promise<any[]>

    get(id:number|string):Promise<any>

    create(obj:any):Promise<any>

    update(obj:any):Promise<any>

    delete(id:number|string):Promise<void>

}
