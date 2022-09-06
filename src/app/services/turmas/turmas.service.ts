import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { Turma } from 'src/app/core/models/turma';

@Injectable({
  providedIn: 'root',
})
export class TurmasService {
  alunosUrl = `${API_CONFIG.baseUrl.prod}/service/alunos`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Turma[]> {
    return this.http.get<Turma[]>(this.alunosUrl);
  }

  findById(id: number): Observable<Turma> {
    return this.http.get<Turma>(`${this.alunosUrl}/${id}`);
  }

  create(aluno: Turma) {
    return this.http.post(this.alunosUrl, aluno);
  }

  update(aluno: Turma) {
    return this.http.put(`${this.alunosUrl}/${aluno.id}`, aluno);
  }

  delete(id: number) {
    return this.http.delete(`${this.alunosUrl}/${id}`);
  }
}

