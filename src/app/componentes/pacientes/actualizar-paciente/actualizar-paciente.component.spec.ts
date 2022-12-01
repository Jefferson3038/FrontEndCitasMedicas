import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPacienteComponent } from './actualizar-paciente.component';

describe('ActualizarPacienteComponent', () => {
  let component: ActualizarPacienteComponent;
  let fixture: ComponentFixture<ActualizarPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
