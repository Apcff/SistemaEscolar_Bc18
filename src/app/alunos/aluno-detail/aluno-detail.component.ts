import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { Aluno } from "src/app/core/models/aluno";
import { AlunosService } from "src/app/services/alunos/alunos.service";


@Component({
  selector: 'app-aluno-detail',
  templateUrl: './aluno-detail.component.html',
  styleUrls: ['./aluno-detail.component.scss']
})
export class AlunoDetailComponent implements OnInit {
    errorMsg = '';
    error = false;
    loading = true;
  
    aluno$?: Observable<Aluno>;

  constructor(
    private alunosService: AlunosService,
    @Inject(MAT_DIALOG_DATA) private data: Aluno

  ) {}

  ngOnInit(): void {
    this.aluno$ = this.alunosService.findById(this.data.id!);
  }

}

