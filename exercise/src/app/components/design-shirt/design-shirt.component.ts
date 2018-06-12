import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ShirtService } from '../../core/shirt.service';
import { Shirt } from '../../shared/shirt';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  @ViewChild('graphicImage') graphicImage: ElementRef;

  colourPickerTitle: string = 'Choose a shirt colour';

  constructor(private shirtService: ShirtService, 
      private sanitizer: DomSanitizer, 
      private renderer: Renderer2) { }

  ngOnInit() {
    
    this.activeTab = 4;
    this.sub = this.shirtService.getEditableShirt().subscribe((shirt) => {
      this.editableShirt = shirt;
      
      if (this.hasGraphic()) {
        this.updateGraphicColour();
      }
    });
  }

  updateGraphicColour(): void {
    if (this.graphicImage.nativeElement) {
      //this.graphicImage.nativeElement.contentDocument.firstChild.children[1].style.fill = this.editableShirt.graphic.colour;
      this.renderer.setStyle(this.graphicImage.nativeElement.contentDocument.firstChild,
      'fill', this.editableShirt.graphic.colour.value);
    }
  }

  toggleTab(tabId: number): void {
    this.activeTab = tabId;
  }

  getStyleImagePath(): string {
    return this.shirtService.getStyleImagePath();
  }

  getGraphicImagePath(graphic?): SafeUrl {
    const path = this.editableShirt.graphic ? this.shirtService.getGraphicImagePath(graphic) : '';
    return this.sanitizer.bypassSecurityTrustResourceUrl(path);
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
