import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCellDef } from "@angular/material/table";
import { MaterialModule } from "../shared/material.module";
import { ProfessorCreateComponent } from "./professor-create/professor-create.component";
import { ProfessorDeleteComponent } from "./professor-delete/professor-delete.component";
import { ProfessorDetailComponent } from "./professor-detail/professor-detail.component";
import { ProfessorUpdateComponent } from "./professor-update/professor-update.component";
import { ProfessoresRoutingModule } from "./professores-routing.module";
import { ProfessoresComponent } from "./professores.component";


@NgModule({
  declarations: [
    ProfessoresComponent,
    ProfessorCreateComponent,
    ProfessorDeleteComponent,
    ProfessorDetailComponent,
    ProfessorUpdateComponent,
  
  ],
  imports: [
    CommonModule,
    ProfessoresRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,


  ]
})
export class ProfessoresModule { }
