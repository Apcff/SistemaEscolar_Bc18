import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { Professor } from 'src/app/core/models/professor';

@Injectable({
  providedIn: 'root',
})
export class ProfessoresService {
  professoresUrl = `${API_CONFIG.baseUrl.prod}/service/professores`;
  constructor(private http: HttpClient) {}

  findAll(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.professoresUrl);
  }

  findById(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.professoresUrl}/${id}`);
  }

  create(professor: Professor) {
    return this.http.post(this.professoresUrl, professor);
  }

  update(professor: Professor) {
    return this.http.put(`${this.professoresUrl}/${professor.id}`, professor);
  }

  delete(id: number) {
    return this.http.delete(`${this.professoresUrl}/${id}`);
  }
  findAllPendentes(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.professoresUrl)
  }
}
