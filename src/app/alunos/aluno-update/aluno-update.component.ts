import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Aluno } from 'src/app/core/models/aluno';
import { AlunosService } from 'src/app/services/alunos/alunos.service';

@Component({
  selector: 'app-aluno-update',
  templateUrl: './aluno-update.component.html',
  styleUrls: ['./aluno-update.component.scss'],
})
export class AlunoUpdateComponent implements OnInit {
  errorMsg = '';
  error = false;
  loading = true;

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
    private route: ActivatedRoute,
    private alunosService: AlunosService,
    private fb: UntypedFormBuilder,
    private toast: HotToastService,
    private router: Router,
    private titleService: Title
  ) {}

  onSubmit() {
    const aluno: Aluno = {
      ...this.alunoForm.value,
   
    };
    
    const ref = this.toast.loading('Atualizando aluno');

    this.alunosService.update(aluno).subscribe({
      next: () => {
        ref.close();
        this.toast.success('aluno atualizado');
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
          case 404:
	          window.navigator?.vibrate?.(200);
            return this.toast.error('Usuário não encontrado')
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
    const id = this.route.snapshot.params['id'];
    this.alunosService.findById(id).subscribe({
      next: (aluno) => {
      
        this.alunoForm.patchValue(aluno);
        
        this.loading = false;
        this.titleService.setTitle('Editar aluno');
      },
      error: (err) => {
        this.errorMsg = err.error.message;
        if (!this.errorMsg) this.errorMsg = 'Um erro aconteceu';
        this.error = true;
        this.loading = false;
      },
    });
  }
}

