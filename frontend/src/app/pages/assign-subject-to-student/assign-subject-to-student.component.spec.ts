import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSubjectToStudentComponent } from './assign-subject-to-student.component';

describe('AssignSubjectToStudentComponent', () => {
  let component: AssignSubjectToStudentComponent;
  let fixture: ComponentFixture<AssignSubjectToStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignSubjectToStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignSubjectToStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
