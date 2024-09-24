import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendExpenseComponent } from './friend-expense.component';

describe('FriendExpenseComponent', () => {
  let component: FriendExpenseComponent;
  let fixture: ComponentFixture<FriendExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
