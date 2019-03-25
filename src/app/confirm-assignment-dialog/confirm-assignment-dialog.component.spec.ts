import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAssignmentDialogComponent } from './confirm-assignment-dialog.component';

describe('ConfirmAssignmentDialogComponent', () => {
  let component: ConfirmAssignmentDialogComponent;
  let fixture: ComponentFixture<ConfirmAssignmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmAssignmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAssignmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
