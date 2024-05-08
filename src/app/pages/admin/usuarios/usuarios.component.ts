import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { UsuarioDialogComponent } from './components/usuario-dialog/usuario-dialog.component';
import { UsuarioService } from './services/usuario.service';
import { UsuarioResponse } from 'src/app/shared/models/usuario.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  usuarios : UsuarioResponse[]=[];
  constructor(private dialog :MatDialog,
              private snackBar: MatSnackBar,
              private usuarioSvc: UsuarioService) { }

  

  ngOnInit(): void { 
    this.listar();
  }

  private listar() {
    this.usuarioSvc.getUsuarios().pipe(takeUntil(this.destroy$)).subscribe((data)=>{
      this.usuarios=data;
    })
   }

  public onOpenModal(user = {}) {
    const dialogRef = this.dialog.open(UsuarioDialogComponent,{
      minWidth: '60%',
      data:{
        title:'Registro de Uusarios',
        user
      }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe (result =>{
      if (result){
        this.listar();
        this.snackBar.open(result.mensaje,'',{
          duration:5000,
          panelClass:['success-snackbar'],
          horizontalPosition:'right',
          verticalPosition:'top'
        })
      }
    });
  }

  onDelete(cveUsuario: number) { 
    Swal.fire({
      text:'¿Realmente desea eliminar el registro?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'btn-primary',
      cancelButtonColor:'red',
      confirmButtonText:'Si',
      cancelButtonText:'No'
    }).then((result)=>{
      if (result.isConfirmed){
        this.usuarioSvc.delete(cveUsuario).pipe(takeUntil(this.destroy$)).subscribe(result=>{
          if(result){
            this.snackBar.open(result.mensaje,'',{
              duration:5000,
              panelClass:['success-snackbar'],
              horizontalPosition:'right',
              verticalPosition:'top'  
            });
            this.listar();
          }
        })
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();

  }
}
