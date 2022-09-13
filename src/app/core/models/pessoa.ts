export interface Pessoa {
    id?: number;
    nome: string;
    cpf: number;
    email: string;
    turma: string;
    professor: string;
    aluno: string;
    dataCriacao: string;
    descricao:string;
    acoes: string,
  }
  
  export interface Aluno extends Pessoa {}
  
  export interface Professor extends Aluno {}
  
  export enum Perfil {
    PROFESSOR,
    ALUNO,
  }
  