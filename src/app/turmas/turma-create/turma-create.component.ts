import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Turma } from 'src/app/core/models/turma';
import { TurmasService } from 'src/app/services/turmas/turmas.service';



@Component({
  selector: 'app-turma-create',
  templateUrl: './turma-create.component.html',
  styleUrls: ['./turma-create.component.scss'],
})
export class TurmaCreateComponent implements OnInit {

  inputsValidos = 0;
  valorProgresso = 10;

  turmaForm = this.fb.group({
    nome: [null, [Validators.required]],
    professor: [null, [Validators.required]],
    aluno: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    dataCriacao: [null, [Validators.required]],
   
  });

  constructor(
    private fb: UntypedFormBuilder,
    private turmasService: TurmasService,
    private toast: HotToastService,
    private router: Router
  ) { }


  onSubmit() {
    const turma: Turma = {
      ...this.turmaForm.value,
      
    };

    const ref = this.toast.loading('Adicionando turma');

    this.turmasService.create(turma).subscribe({
      next: () => {
        ref.close();
        this.toast.success('turma criado');
        this.router.navigate(['turmas']);
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
    this.turmaForm.valueChanges.subscribe({
      next: (turma) => {

        this.inputsValidos = 0;

        for (var campo in turma) {
          if (turma[campo] != null && turma[campo] != '') {
            if (JSON.stringify(turma[campo]) != JSON.stringify([false, false, false])) {
              this.inputsValidos++;
            }
            this.valorProgresso = this.inputsValidos * 10;
          }
        }
      }
    })
  }
}
