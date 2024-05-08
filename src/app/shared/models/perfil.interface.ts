import { Rol } from "./rol.interface";

export interface Perfil{
    cveUsuario:number,
    nombre:string,
    apellidos:string,
    username:string,
    email:string,
    roles:Rol[],
    
}