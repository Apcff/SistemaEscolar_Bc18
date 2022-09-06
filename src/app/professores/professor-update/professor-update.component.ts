import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Professor } from 'src/app/core/models/professor';
import { ProfessoresService } from 'src/app/services/professores/professores.service';

@Component({
  selector: 'app-professor-update',
  templateUrl: './professor-update.component.html',
  styleUrls: ['./professor-update.component.scss']
})
export class ProfessorUpdateComponent implements OnInit {

  errorMsg = '';
  error = false;
  loading = true;

  professorForm = this.fb.group({
    id: [null],
    nome: [null, [Validators.required]],
    turma: [null, [Validators.required, Validators.maxLength(14)]],
    email: [null, [Validators.required, Validators.email]],
    formacao: [null, [Validators.required]],
    // perfils: this.fb.array([[false], [false], [false]], [someTrue]),
  });

  constructor(
    private route: ActivatedRoute,
    private professoresService: ProfessoresService,
    private fb: UntypedFormBuilder,
    private toast: HotToastService,
    private router: Router,
    private titleService: Title
  ) {}

  onSubmit() {
    const professor: Professor = {
      ...this.professorForm.value,
      // perfils: trueIndexes(this.professorForm.value.perfils),
    };
    
    const ref = this.toast.loading('Atualizando professor');

    this.professoresService.update(professor).subscribe({
      next: () => {
        ref.close();
        this.toast.success('professor atualizado');
        this.router.navigate(['professors']);
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
    this.professoresService.findById(id).subscribe({
      next: (professor) => {
        // professor.senha = '';
        // const perfils = profileChecked(professor.perfils as string[]);
        this.professorForm.patchValue(professor);
        // this.professorForm.get('perfils')?.setValue(perfils);
        this.loading = false;
        this.titleService.setTitle('Editar professor');
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
