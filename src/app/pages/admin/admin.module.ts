import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from 'src/app/material.module';

import { ContadoresComponent } from './contadores/contadores.component';
import { ContadorDialogComponent } from './contadores/components/contador-dialog/contador-dialog.component';


@NgModule({
  declarations: [
    AdminComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
  ]
})
export class AdminModule { }
