import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { ContadorDialogComponent } from './components/contador-dialog/contador-dialog.component'; // Asegúrate de importar el componente de diálogo correcto
import { ContadorService } from './services/contador.service'; // Asegúrate de importar el servicio de contador correcto
import { ContadorResponse } from 'src/app/shared/models/contador.interface'; // Asegúrate de importar la interfaz de contador correcta
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contadores', // Cambia el nombre del selector según tu estructura de componentes
  templateUrl: './contadores.component.html', // Asegúrate de tener el archivo HTML correcto
  styleUrls: ['./contadores.component.scss'] // Asegúrate de tener los estilos correctos
})
export class ContadoresComponent implements OnInit, OnDestroy {

  instrumentosMapping: { [key: number]: string } = {};

  private destroy$ = new Subject();
  contadores: ContadorResponse[] = [];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private contadorSvc: ContadorService,
        private authSvc: ContadorService  // Cambio de MusicoService a ContadorService
 // Asegúrate de tener el servicio de contador correcto
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  private listar() {
    this.contadorSvc.getContadores().pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.contadores = data;
    });
  }

  onOpenModal(contador = {}) {
    console.log(contador);
    const dialogRef = this.dialog.open(ContadorDialogComponent, {
      minWidth: '60%',
      data: {
        title: 'Registros de contadores',
        contador
      }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      if (result) {
        this.listar();
        this.snackBar.open(result.mensaje, '', {
          duration: 5000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      }
    })
  }

  onDelete(cveContador: number) {
    Swal.fire({
      text: '¿Estas seguro que deas eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contadorSvc.delete(cveContador).pipe(takeUntil(this.destroy$)).subscribe(result => {
          if (result) {
            this.snackBar.open(result.mensaje, '', {
              duration: 5000,
              panelClass: ['success-snackbar'],
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
            this.listar();
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(({}));
    this.destroy$.complete();
  }

}
