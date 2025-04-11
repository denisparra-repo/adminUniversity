import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSubjectToCourseComponent } from './assign-subject-to-course.component';

describe('AssignSubjectToCourseComponent', () => {
  let component: AssignSubjectToCourseComponent;
  let fixture: ComponentFixture<AssignSubjectToCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignSubjectToCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignSubjectToCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
