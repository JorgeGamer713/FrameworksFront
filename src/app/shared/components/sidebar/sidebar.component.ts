import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Perfil } from '../../models/perfil.interface';
import { AuthService } from 'src/app/pages/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit,OnDestroy{

  private destroy$ = new Subject();
  data:Perfil|undefined;
  menus:any[]=[];
  constructor(private authSvc:AuthService){}

  ngOnInit(): void {
    this.authSvc.tokenData$.pipe(takeUntil(this.destroy$)).subscribe( (data)=>{
      this.data=data;
      this.generarMenu();
    } );
  }

  private generarMenu(){
    this.menus=[];
    var roles = this.data?.roles;
    if (roles){
      //realizar un ciclo for para el arreglo roles 
      for(let rol of roles){
        console.log(rol.nombre)

        //Administrador
        //usuarios
        //categorias
        //productos
        if(rol.clave=="admin"){
          this.menus.push(...[
            {icon:'person',name:'Usuario',route:'admin/usuarios'},
            {icon:'category',name:'Categorias',route:'admin/categorias'},
            {icon:'inventory_2',name:'Productos',route:'admin/productos'},
            {icon:'person_book',name:'Contadores',route:'admin/contadores'}
          ])
        }

        //Ventas
        //ventas
        //Reportes
        if (rol.clave=="ventas"){
          this.menus.push(...[
            {icon:'sell',name:'Ventas',route:'ventas'},
            {icon:'trending_up',name:'Reportes',route:'ventas/reportes'}
          ])
        }
        
      }
    }

  }

  ngOnDestroy():void{
      this.destroy$.next({})
      this.destroy$.complete()
  }
}