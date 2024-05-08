import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { BaseForm } from 'src/app/shared/utils/base-form';
import { ContadorService } from '../../services/contador.service'; // Cambio de MusicoService a ContadorService

enum Action {
  NEW = 'new',
  EDIT = 'edit'
}

@Component({
  selector: 'app-contador-dialog', // Cambio de musico-dialog a contador-dialog
  templateUrl: './contador-dialog.component.html', // Cambio de musico-dialog a contador-dialog
  styleUrls: ['./contador-dialog.component.scss'] // Cambio de musico-dialog a contador-dialog
})
export class ContadorDialogComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();
  actionTODO = Action.NEW;
  tittleButton = "Guardar";
  hidePwd = true;
  hideConfirmPwd = true;


  contadorForm = this.fb.group({
    cveContador: [''], // Cambio de cveMusico a cveContador
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    direccion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
    tipoContratacion: ['', [Validators.required]], // Cambio de intrumento a intrumento
    fechaRegistro: ['', [Validators.required]],
  }, {})

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ContadorDialogComponent>, // Cambio de MusicoDialogComponent a ContadorDialogComponent
    private fb: FormBuilder,
    public baseForm: BaseForm,
    private authSvc: ContadorService  // Cambio de MusicoService a ContadorService
  ) { }

  ngOnInit(): void {
    if (this.data.contador.cveContador) { // Cambio de musico a contador
      this.pathData();
    }
  }

  private pathData() {
    this.actionTODO = Action.EDIT;
    this.tittleButton = "Actualizar";

    this.contadorForm.patchValue({
      cveContador: this.data.contador.cveContador, // Cambio de musico a contador
      nombre: this.data.contador.nombre,
      direccion: this.data.contador.direccion,
      tipoContratacion: this.data.contador.tiposdeContratacion,
      fechaRegistro: this.data.contador.fechaRegistro
    });
  }

  onSave() {
    // Verificar si el formulario es inválido
    if (this.contadorForm.invalid) return;

    // Obtener la data del formulario
    var data = this.contadorForm.getRawValue();

    // Verificar el tipo de acción: save, edit
    if (this.actionTODO == Action.NEW) { // Guardar
      console.log('Datos que se envían al servicio en onSave:', data);
      // Obtener información a guardar
      const { cveContador, ...contador } = data; // Cambio de musico a contador

      this.authSvc.new(contador).pipe(takeUntil(this.destroy$)).subscribe(result => {
        if (result) {
          this.dialogRef.close(result);
        }
      });
    } else { // Actualizar
      this.authSvc.update(data).pipe(takeUntil(this.destroy$)).subscribe(result => {
        if (result) {
          this.dialogRef.close(result);
        }
      });
    }
  }

  onClear() {
    if (this.actionTODO == Action.NEW) {
      this.contadorForm.reset();
    } else {
      this.contadorForm.patchValue({
        cveContador: this.data.contador.cveContador, // Cambio de musico a contador
        nombre: '',
        direccion: '',
        tipoContratacion: '',
        fechaRegistro: ''
      });
    }
  }
  tiposdeContratacion = [
    { id: 1, nombre: 'Tiempo indeterminado.' },
    { id: 2, nombre: 'Honorarios' },
    { id: 3, nombre: 'Trabajo temporal' },
    { id: 4, nombre: 'Periodo de pruebas' },
    // Agrega más instrumentos según sea necesario
];


  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
