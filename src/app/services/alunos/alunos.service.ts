import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { Aluno } from 'src/app/core/models/aluno';


@Injectable({
  providedIn: 'root',
})
export class AlunosService {
  alunosUrl = `${API_CONFIG.baseUrl.prod}/service/alunos`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.alunosUrl);
  }

  findById(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.alunosUrl}/${id}`);
  }

  create(aluno: Aluno) {
    return this.http.post(this.alunosUrl, aluno);
  }

  update(aluno: Aluno) {
    return this.http.put(`${this.alunosUrl}/${aluno.id}`, aluno);
  }

  delete(id: number) {
    return this.http.delete(`${this.alunosUrl}/${id}`);
  }
}
