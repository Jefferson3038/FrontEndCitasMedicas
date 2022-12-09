import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateDocComponent } from './dialog-create-doc.component';

describe('DialogCreateDocComponent', () => {
  let component: DialogCreateDocComponent;
  let fixture: ComponentFixture<DialogCreateDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
