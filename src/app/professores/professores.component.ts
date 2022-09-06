import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { EMPTY, Observable } from 'rxjs';
import { Professor } from '../core/models/professor';
import { ProfessoresService } from '../services/professores/professores.service';
import { ProfessorDeleteComponent } from './professor-delete/professor-delete.component';
import { ProfessorDetailComponent } from './professor-detail/professor-detail.component';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.scss']
})
export class ProfessoresComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nome',
    'turma',
    'formacao',
    'dataCriacao',
    'acoes',
  ];

  professores$: Observable<Professor[]> = EMPTY;
  dataSources = new MatTableDataSource<Professor>();
  isLoading = true;

  constructor(
    private professoresService: ProfessoresService,
    private toast: HotToastService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  findAll() {
    this.professoresService.findAll().subscribe((resposta) => {
      this.isLoading = false;
      this.dataSources.data = resposta;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSources.filter = filterValue.trim().toLowerCase();
  }

  onClickDelete(professor: Professor, id: number) {
    const ref = this.dialog.open(ProfessorDeleteComponent, {
      minWidth: '400px',
      data: professor,
    });
    ref.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.professoresService.delete(id).subscribe({
            next: () => {
              this.professores$ = this.professoresService.findAll();
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
  
  openDialog(professor: Professor): void {
    this.dialog.open(ProfessorDetailComponent, {
      width: '500px',
      data: { ...professor },
    });
  }

  ngOnInit(): void {
   
    this.findAll();
  }
}