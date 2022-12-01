import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizaruserDialogComponent } from './actualizaruser-dialog.component';

describe('ActualizaruserDialogComponent', () => {
  let component: ActualizaruserDialogComponent;
  let fixture: ComponentFixture<ActualizaruserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizaruserDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizaruserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
