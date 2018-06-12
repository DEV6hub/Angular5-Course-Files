import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupUserInfoComponent } from './signup-user-info.component';

describe('ContactInfoComponent', () => {
  let component: SignupUserInfoComponent;
  let fixture: ComponentFixture<SignupUserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupUserInfoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
