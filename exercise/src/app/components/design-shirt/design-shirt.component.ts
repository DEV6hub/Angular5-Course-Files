import { Component, OnInit, ViewChild } from '@angular/core';
import { ShirtService } from '../../core/shirt.service';
import { Shirt, Graphic, Colour } from '../../shared/shirt';
import { Subscription } from 'rxjs';

const FRACTAL_PATH = '../../../assets/images/Fractal.png';
const SAVED_TAB = 'design_tab';

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
  currentGraphicImageUrl: string;

  colourPickerTitle: string = 'Choose a shirt colour';

  constructor(private shirtService: ShirtService) {
  }

  ngOnInit() {
    let savedTab = localStorage.getItem(SAVED_TAB);
    if (!savedTab) {
      localStorage.setItem(SAVED_TAB, '1');
    }
    this.activeTab = parseInt(localStorage.getItem(SAVED_TAB));
    this.sub = this.shirtService.getEditableShirt().subscribe((shirt) => {
      this.editableShirt = shirt;
    });

    this.currentGraphicImageUrl = this.getGraphicImagePath();
  }

  toggleTab(tabId: number): void {
    this.activeTab = tabId;
    localStorage.setItem(SAVED_TAB, tabId.toString());
  }

  getStyleImagePath(): string {
    return this.shirtService.getStyleImagePath();
  }

  getGraphicImagePath(graphic?): string {
    return this.editableShirt.graphic.fileName ? this.shirtService.getGraphicImagePath(graphic) : '';
  }

  changeGraphic(graphic?: Graphic): void {
    const selectedGraphic = graphic ? graphic : this.editableShirt.graphic;
    this.editableShirt.graphic = selectedGraphic;
    this.currentGraphicImageUrl = this.getGraphicImagePath(selectedGraphic);
  }

  changeGraphicColour(colour: Colour): void {
    this.editableShirt.graphic.colour = colour;
    this.currentGraphicImageUrl = this.getGraphicImagePath();
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
