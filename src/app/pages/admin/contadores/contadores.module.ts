import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContadoresRoutingModule } from './contadores-routing.module';
import { ContadoresComponent } from './contadores.component';
import { ContadorDialogComponent } from './components/contador-dialog/contador-dialog.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContadoresComponent,
    ContadorDialogComponent
  ],
  imports: [
    CommonModule,
    ContadoresRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ContadoresModule { }
