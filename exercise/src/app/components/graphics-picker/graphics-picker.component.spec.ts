import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsPickerComponent } from './graphics-picker.component';

describe('GraphicsPickerComponent', () => {
  let component: GraphicsPickerComponent;
  let fixture: ComponentFixture<GraphicsPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicsPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicsPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
