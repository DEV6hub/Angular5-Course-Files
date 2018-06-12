import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StylePickerComponent } from './style-picker.component';

describe('StylePickerComponent', () => {
  let component: StylePickerComponent;
  let fixture: ComponentFixture<StylePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StylePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StylePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
