import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmaDetailComponent } from './turma-detail.component';

describe('TurmaDetailComponent', () => {
  let component: TurmaDetailComponent;
  let fixture: ComponentFixture<TurmaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurmaDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurmaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
