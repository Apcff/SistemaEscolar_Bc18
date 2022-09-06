import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Professor } from 'src/app/core/models/professor';

@Component({
  selector: 'app-professor-delete',
  templateUrl: './professor-delete.component.html',
  styleUrls: ['./professor-delete.component.scss']
})
export class ProfessorDeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public professor: Professor,
    private ref: MatDialogRef<ProfessorDeleteComponent>
  ) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    this.ref.close({ professor: this.professor });
  }
}
