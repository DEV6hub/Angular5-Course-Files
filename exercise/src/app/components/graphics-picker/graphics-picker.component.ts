import { Component, OnInit } from '@angular/core';
import { Shirt, Colour } from '../../shared/shirt';
import { Subscription } from 'rxjs';
import { ShirtService } from '../../core/shirt.service';
import { GRAPHICS } from '../../constants/static-data.constants';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-graphics-picker',
  templateUrl: './graphics-picker.component.html',
  styleUrls: ['./graphics-picker.component.css']
})
export class GraphicsPickerComponent implements OnInit {

  graphics = GRAPHICS;

  editableShirt: Shirt;
  sub: Subscription;
  graphicColourTitle: string = 'Change graphic colour';

  constructor(private shirtService: ShirtService) { }

  ngOnInit() {
    this.sub = this.shirtService.getEditableShirt().subscribe((shirt) => {
      this.editableShirt = shirt;
    });
  }

  pickGraphic(graphic): void {
    Object.assign(this.editableShirt.graphic, graphic);
  }

  getGraphicImagePath(graphic): string {
    return this.shirtService.getGraphicImagePath(graphic);
  }

  changedColour(colour: Colour): void {
    this.shirtService.selectGraphicColour(colour);
  }

}
