import { HttpStatusCode } from "@angular/common/http";

export interface Aluno {
id ?: number;
nome: string;
cpf: string;
turma: string;
email: string;
senha: string;
professor: string;
perfis:string;
nota: number;
dataCriacao: string;
descricao:string;
status:HttpStatusCode;
acoes: string;


}