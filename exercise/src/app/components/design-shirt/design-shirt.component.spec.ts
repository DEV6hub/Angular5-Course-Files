import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignShirtComponent } from './design-shirt.component';

describe('DesignComponent', () => {
  let component: DesignShirtComponent;
  let fixture: ComponentFixture<DesignShirtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignShirtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignShirtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
