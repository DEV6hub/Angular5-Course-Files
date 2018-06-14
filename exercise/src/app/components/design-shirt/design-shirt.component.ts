import { Component, OnInit, ViewChild } from '@angular/core';
import { ShirtService } from '../../core/shirt.service';
import { Shirt, Graphic } from '../../shared/shirt';
import { Subscription } from 'rxjs';
import { GraphicTextEditorComponent } from '../graphic-text-editor/graphic-text-editor.component';

const FRACTAL_PATH = '../../../assets/images/Fractal.png';

@Component({
  selector: 'app-design-shirt',
  templateUrl: './design-shirt.component.html',
  styleUrls: ['./design-shirt.component.css']
})
export class DesignShirtComponent implements OnInit {

  bgPath: string = FRACTAL_PATH;

  activeTab: number;
  editableShirt: Shirt;
  sub: Subscription;
  @ViewChild('graphicEditor') graphicEditor: GraphicTextEditorComponent;

  colourPickerTitle: string = 'Choose a shirt colour';

  constructor(private shirtService: ShirtService) {
  }

  ngOnInit() {
    
    this.activeTab = 4;
    this.sub = this.shirtService.getEditableShirt().subscribe((shirt) => {
      this.editableShirt = shirt;
      
      if (this.hasGraphic()) {
        this.changeGraphic();
      }
    });
  }

  toggleTab(tabId: number): void {
    this.activeTab = tabId;
  }

  getStyleImagePath(): string {
    return this.shirtService.getStyleImagePath();
  }

  getGraphicImagePath(graphic?): string {
    return this.editableShirt.graphic ? this.shirtService.getGraphicImagePath(graphic) : '';
    // return this.sanitizer.bypassSecurityTrustResourceUrl(path);
  }

  changeGraphic(graphic?: Graphic): void {
    const selectedGraphic = graphic ? graphic : this.editableShirt.graphic;
    if (this.graphicEditor) {
      this.graphicEditor.loadImage(this.getGraphicImagePath(selectedGraphic));
    }
  }

  getTextColour(): string {
    return (this.editableShirt.text.colour ? this.editableShirt.text.colour.value : '');
  }

  getTextFont(): string {
    return (this.editableShirt.text.font ? this.editableShirt.text.font : '');
  }

  hasGraphic(): boolean {
    return (this.editableShirt.graphic ? this.editableShirt.graphic.name !== '' : false);
  }

  hasText(): boolean {
    return (this.editableShirt.text ? this.editableShirt.text.value !== '' : false);
  }

}
