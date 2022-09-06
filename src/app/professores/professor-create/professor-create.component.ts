import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Professor } from 'src/app/core/models/professor';
import { ProfessoresService } from 'src/app/services/professores/professores.service';

@Component({
  selector: 'app-professor-create',
  templateUrl: './professor-create.component.html',
  styleUrls: ['./professor-create.component.scss'],
})
export class ProfessorCreateComponent implements OnInit {

  inputsValidos = 0;
  valorProgresso = 10;

  professorForm = this.fb.group({
    nome: [null, [Validators.required]],
    // cpf: [null, [Validators.required, Validators.maxLength(14)]],
    turma: [null, [Validators.required, Validators.maxLength(5)]],
    email: [null, [Validators.required, Validators.email]],
    formacao: [null, [Validators.required]],
    dataCriacao: [null, [Validators.required]],
   
  });

  constructor(
    private fb: UntypedFormBuilder,
    private professorService: ProfessoresService,
    private toast: HotToastService,
    private router: Router
  ) { }


  onSubmit() {
    const professor: Professor = {
      ...this.professorForm.value,
      
    };

    const ref = this.toast.loading('Adicionando professor');

    this.professorService.create(professor).subscribe({
      next: () => {
        ref.close();
        this.toast.success('professor criado');
        this.router.navigate(['professores']);
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
    this.professorForm.valueChanges.subscribe({
      next: (professor) => {

        this.inputsValidos = 0;

        for (var campo in professor) {
          if (professor[campo] != null && professor[campo] != '') {
            if (JSON.stringify(professor[campo]) != JSON.stringify([false, false, false])) {
              this.inputsValidos++;
            }
            this.valorProgresso = this.inputsValidos * 10;
          }
        }
      }
    })
  }
}
