import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreatePacComponent } from './dialog-create-pac.component';

describe('DialogCreatePacComponent', () => {
  let component: DialogCreatePacComponent;
  let fixture: ComponentFixture<DialogCreatePacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreatePacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreatePacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
