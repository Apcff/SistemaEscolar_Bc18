import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmaCreateComponent } from './turma-create.component';

describe('TurmaCreateComponent', () => {
  let component: TurmaCreateComponent;
  let fixture: ComponentFixture<TurmaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurmaCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurmaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
