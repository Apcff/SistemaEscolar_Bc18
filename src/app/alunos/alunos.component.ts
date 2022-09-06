import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { EMPTY, Observable } from 'rxjs';
import { Aluno } from '../core/models/aluno';
import { AlunosService } from '../services/alunos/alunos.service';
import { AlunoDeleteComponent } from './aluno-delete/aluno-delete.component';
import { AlunoDetailComponent } from './aluno-detail/aluno-detail.component';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss']
})
export class AlunosComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nome',
    'turma',
    'nota',
    'dataCriacao',
    'acoes',
  ];

  alunos$: Observable<Aluno[]> = EMPTY;
  dataSources = new MatTableDataSource<Aluno>();
  isLoading = true;

  constructor(
    private alunosService: AlunosService,
    private toast: HotToastService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  findAll() {
    this.alunosService.findAll().subscribe((resposta) => {
      this.isLoading = false;
      this.dataSources.data = resposta;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSources.filter = filterValue.trim().toLowerCase();
  }

  onClickDelete(aluno: Aluno, id: number) {
    const ref = this.dialog.open(AlunoDeleteComponent, {
      minWidth: '400px',
      data: aluno,
    });
    ref.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.alunosService.delete(id).subscribe({
            next: () => {
              this.alunos$ = this.alunosService.findAll();
              this.toast.success('Usuário deletado');
              ref.close();
            },
            error: (err) => {
              ref.close();
              switch (err.status) {
                case 403:
                  window.navigator?.vibrate?.(200);
                  return this.toast.error('Ação não permitida');
                case 404:
	                window.navigator?.vibrate?.(200);
                  return this.toast.error('Usuário não encontrado')
                case 409:
                  window.navigator?.vibrate?.(200);
                  return this.toast.error(err.error.message);
                default:
	                window.navigator?.vibrate?.(200);
                  return this.toast.error(`Um erro aconteceu: ${err.error.message ?? 'Verifique sua conexão com a internet'}`);
              }
            },
          });
        }
      },
    });
  }
  
  openDialog(aluno: Aluno): void {
    this.dialog.open(AlunoDetailComponent, {
      width: '500px',
      data: { ...aluno },
    });
  }

  ngOnInit(): void {
   
    this.findAll();
  }
}