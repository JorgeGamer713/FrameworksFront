import { Rol } from "./rol.interface";

export interface UsuarioResponse {
    cveUsuario:number,
    nombre:string,
    apellidos:string,
    username:string,
    email:string,
    fechaRegistro:Date,
    roles:Rol[];
}