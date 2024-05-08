import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContadoresComponent } from './contadores.component';

const routes: Routes = [{ path: '', component: ContadoresComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContadoresRoutingModule { }
