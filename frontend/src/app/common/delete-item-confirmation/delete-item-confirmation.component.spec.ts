import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteItemConfirmationComponent } from './delete-item-confirmation.component';

describe('DeleteItemConfirmationComponent', () => {
  let component: DeleteItemConfirmationComponent;
  let fixture: ComponentFixture<DeleteItemConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteItemConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteItemConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
