import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserInfoComponent } from './update-user-info.component';

describe('UpdateUserInfoComponent', () => {
  let component: UpdateUserInfoComponent;
  let fixture: ComponentFixture<UpdateUserInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUserInfoComponent]
    });
    fixture = TestBed.createComponent(UpdateUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
