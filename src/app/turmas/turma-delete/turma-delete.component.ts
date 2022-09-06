import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Turma } from 'src/app/core/models/turma';

@Component({
  selector: 'app-turma-delete',
  templateUrl: './turma-delete.component.html',
  styleUrls: ['./turma-delete.component.scss']
})
export class TurmaDeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public turma: Turma,
    private ref: MatDialogRef<TurmaDeleteComponent>
  ) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    this.ref.close({ turma: this.turma });
  }
}
