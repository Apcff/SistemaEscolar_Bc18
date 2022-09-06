import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Turma } from 'src/app/core/models/turma';
import { TurmasService } from 'src/app/services/turmas/turmas.service';


@Component({
  selector: 'app-turma-detail',
  templateUrl: './turma-detail.component.html',
  styleUrls: ['./turma-detail.component.scss'],
})
export class TurmaDetailComponent implements OnInit {
  errorMsg = '';
    error = false;
    loading = true;
  
    turma$?: Observable<Turma>;

  constructor(
    private turmasService: TurmasService,
    @Inject(MAT_DIALOG_DATA) private data: Turma

  ) {}

  ngOnInit(): void {
    this.turma$ = this.turmasService.findById(this.data.id!);
  }

}
