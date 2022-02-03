import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeshboardComponent } from './deshboard/deshboard.component';
import { EditdataComponent } from './editdata/editdata.component';

const routes: Routes = [
  {path: '', component: DeshboardComponent },
  { path : "edit/:id", component: EditdataComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
