import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateCitaComponent } from './dialog-create-cita.component';

describe('DialogCreateCitaComponent', () => {
  let component: DialogCreateCitaComponent;
  let fixture: ComponentFixture<DialogCreateCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateCitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
