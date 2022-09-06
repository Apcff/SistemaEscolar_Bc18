import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavRoutingModule } from './nav-routing.module';
import { NavComponent } from './nav.component';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    NavComponent
  ],
  imports: [
    CommonModule,
    NavRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    NgxMaskModule.forRoot()
  
  ]
  
})
export class NavModule { }
