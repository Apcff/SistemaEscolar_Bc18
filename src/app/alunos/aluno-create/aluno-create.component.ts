import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";
import { Aluno } from "src/app/core/models/aluno";
import { AlunosService } from "src/app/services/alunos/alunos.service";


@Component({
  selector: 'app-aluno-create',
  templateUrl: './aluno-create.component.html',
  styleUrls: ['./aluno-create.component.scss'],
})
export class AlunoCreateComponent implements OnInit {

  inputsValidos = 0;
  valorProgresso = 10;

  alunoForm = this.fb.group({
    nome: [null, [Validators.required]],
    cpf: [null, [Validators.required, Validators.maxLength(14)]],
    turma: [null, [Validators.required, Validators.maxLength(5)]],
    email: [null, [Validators.required, Validators.email]],
    professor: [null, [Validators.required]],
    nota: [null, [Validators.required]],
    dataCriacao: [null, [Validators.required]],
   
  });

  constructor(
    private fb: UntypedFormBuilder,
    private alunosService: AlunosService,
    private toast: HotToastService,
    private router: Router
  ) { }


  onSubmit() {
    const aluno: Aluno = {
      ...this.alunoForm.value,
      
    };

    const ref = this.toast.loading('Adicionando aluno');

    this.alunosService.create(aluno).subscribe({
      next: () => {
        ref.close();
        this.toast.success('aluno criado');
        this.router.navigate(['alunos']);
      },
      error: (err) => {
        ref.close();
        switch (err.status) {
          case 400:
            window.navigator?.vibrate?.(200);
            return this.toast.error('Preencha todos os campos');
          case 403:
            window.navigator?.vibrate?.(200);
            return this.toast.error('Ação não permitida');
          case 409:
            window.navigator?.vibrate?.(200);
            return this.toast.error(err.error.message);
          case 500:
            window.navigator?.vibrate?.(200);
            return this.toast.error('CPF Inválido, verifique e tente novamente');
          default:
            window.navigator?.vibrate?.(200);
            return this.toast.error(
              `Um erro aconteceu: ${err.error.message ?? 'Verifique sua conexão com a internet'}`
            );
        }
      },
    });
  }

  ngOnInit(): void {
    this.alunoForm.valueChanges.subscribe({
      next: (aluno) => {

        this.inputsValidos = 0;

        for (var campo in aluno) {
          if (aluno[campo] != null && aluno[campo] != '') {
            if (JSON.stringify(aluno[campo]) != JSON.stringify([false, false, false])) {
              this.inputsValidos++;
            }
            this.valorProgresso = this.inputsValidos * 10;
          }
        }
      }
    })
  }
}

