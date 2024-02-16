import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionInfoComponent } from './description-info.component';

describe('DescriptionInfoComponent', () => {
  let component: DescriptionInfoComponent;
  let fixture: ComponentFixture<DescriptionInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescriptionInfoComponent]
    });
    fixture = TestBed.createComponent(DescriptionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
