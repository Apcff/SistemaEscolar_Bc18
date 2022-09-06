import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Aluno } from 'src/app/core/models/aluno';

@Component({
  selector: 'app-aluno-delete',
  templateUrl: './aluno-delete.component.html',
  styleUrls: ['./aluno-delete.component.scss']
})
export class AlunoDeleteComponent implements OnInit {

constructor(
  @Inject(MAT_DIALOG_DATA) public aluno: Aluno,
  private ref: MatDialogRef<AlunoDeleteComponent>
) { }
ngOnInit(): void {
  throw new Error('Method not implemented.');
}

onSubmit() {
  this.ref.close({ aluno: this.aluno });
}
}
