import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicTextEditorComponent } from './graphic-text-editor.component';

describe('GraphicTextEditorComponent', () => {
  let component: GraphicTextEditorComponent;
  let fixture: ComponentFixture<GraphicTextEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicTextEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
