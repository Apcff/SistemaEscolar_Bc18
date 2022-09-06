import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { EMPTY, Observable } from 'rxjs';
import { Turma } from '../core/models/turma';
import { TurmasService } from '../services/turmas/turmas.service';
import { TurmaDeleteComponent } from './turma-delete/turma-delete.component';
import { TurmaDetailComponent } from './turma-detail/turma-detail.component';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.scss'],
})
export class TurmasComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nome',
    'professor',
    'aluno',
    'dataCriacao',
    'acoes',
  ];

  turmas$: Observable<Turma[]> = EMPTY;
  dataSources = new MatTableDataSource<Turma>();
  isLoading = true;

  constructor(
    private turmasService: TurmasService,
    private toast: HotToastService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  findAll() {
    this.turmasService.findAll().subscribe((resposta) => {
      this.isLoading = false;
      this.dataSources.data = resposta;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSources.filter = filterValue.trim().toLowerCase();
  }

  onClickDelete(turma: Turma, id: number) {
    const ref = this.dialog.open(TurmaDeleteComponent, {
      minWidth: '400px',
      data: turma,
    });
    ref.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.turmasService.delete(id).subscribe({
            next: () => {
              this.turmas$ = this.turmasService.findAll();
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

  openDialog(turma: Turma): void {
    this.dialog.open(TurmaDetailComponent, {
      width: '500px',
      data: { ...turma },
    });
  }

  ngOnInit(): void {

    this.findAll();
  }
}

