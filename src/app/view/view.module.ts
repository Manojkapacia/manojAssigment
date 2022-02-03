import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { DeshboardComponent } from './deshboard/deshboard.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DeshboardComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ViewModule { }
