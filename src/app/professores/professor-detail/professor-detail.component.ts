import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Pessoa } from 'src/app/core/models/pessoa';
import { Professor } from 'src/app/core/models/professor';
import { ProfessoresService } from 'src/app/services/professores/professores.service';

@Component({
  selector: 'app-professor-detail',
  templateUrl: './professor-detail.component.html',
  styleUrls: ['./professor-detail.component.scss'],
})
export class ProfessorDetailComponent implements OnInit {
  errorMsg = '';
    error = false;
    loading = true;
  
    professor$?: Observable<Professor>;

  constructor(
    private professoresService: ProfessoresService,
    @Inject(MAT_DIALOG_DATA) private data: Professor

  ) {}

  ngOnInit(): void {
    this.professor$ = this.professoresService.findById(this.data.id!);
  }

}