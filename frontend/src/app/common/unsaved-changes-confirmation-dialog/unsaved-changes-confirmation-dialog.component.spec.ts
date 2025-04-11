import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsavedChangesConfirmationDialogComponent } from './unsaved-changes-confirmation-dialog.component';

describe('UnsavedChangesConfirmationDialogComponent', () => {
  let component: UnsavedChangesConfirmationDialogComponent;
  let fixture: ComponentFixture<UnsavedChangesConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsavedChangesConfirmationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnsavedChangesConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
