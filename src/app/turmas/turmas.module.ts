import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../shared/material.module";
import { TurmaCreateComponent } from "./turma-create/turma-create.component";
import { TurmaDeleteComponent } from "./turma-delete/turma-delete.component";
import { TurmaDetailComponent } from "./turma-detail/turma-detail.component";
import { TurmaUpdateComponent } from "./turma-update/turma-update.component";
import { TurmasRoutingModule } from "./turmas-routing.module";
import { TurmasComponent } from "./turmas.component";




@NgModule({
  declarations: [
    TurmasComponent,
    TurmaCreateComponent,
    TurmaDeleteComponent,
    TurmaDetailComponent,
    TurmaUpdateComponent,
  ],

  imports: [
    CommonModule,
    TurmasRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TurmasModule { }
