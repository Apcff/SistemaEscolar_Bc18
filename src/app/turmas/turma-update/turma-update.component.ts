import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";
import { Turma } from "src/app/core/models/turma";
import { TurmasService } from "src/app/services/turmas/turmas.service";

@Component({
  selector: 'app-turma-update',
  templateUrl: './turma-update.component.html',
  styleUrls: ['./turma-update.component.scss']
})
export class TurmaUpdateComponent implements OnInit {
  errorMsg = '';
  error = false;
  loading = true;

  turmaForm = this.fb.group({
    nome: [null, [Validators.required]],
    professor: [null, [Validators.required]],
    aluno: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    dataCriacao: [null, [Validators.required]],
  });

  constructor(
    private route: ActivatedRoute,
    private turmasService: TurmasService,
    private fb: UntypedFormBuilder,
    private toast: HotToastService,
    private router: Router,
    private titleService: Title
  ) {}

  onSubmit() {
    const turma: Turma = {
      ...this.turmaForm.value,
   
    };
    
    const ref = this.toast.loading('Atualizando turma');

    this.turmasService.update(turma).subscribe({
      next: () => {
        ref.close();
        this.toast.success('turma atualizado');
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
    this.turmasService.findById(id).subscribe({
      next: (turma) => {
      
        this.turmaForm.patchValue(turma);
        
        this.loading = false;
        this.titleService.setTitle('Editar turma');
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

