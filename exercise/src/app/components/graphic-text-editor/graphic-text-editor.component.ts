import { Component, OnInit, ElementRef, Input } from '@angular/core';
import 'fabric';
declare const fabric: any;

@Component({
  selector: 'app-graphic-text-editor',
  templateUrl: './graphic-text-editor.component.html',
  styleUrls: ['./graphic-text-editor.component.css']
})
export class GraphicTextEditorComponent implements OnInit {

  private canvas: fabric.Canvas;
  private currentImage: fabric.Image;
  @Input() imageUrl: string;

  constructor(private element: ElementRef) { }

  ngOnInit() {
    
    if (this.imageUrl) {
      this.loadImage();
    }
  }

  public loadImage(imgUrl?: string): void {
    const imgUrlToUse = imgUrl || this.imageUrl;
    console.log(imgUrlToUse);
    if (this.canvas) {
      if (this.currentImage) {
        this.currentImage.setSrc(imgUrlToUse, (img) => {
          img.scaleToWidth(this.canvas.getWidth() - 20);
          this.currentImage = img;
          this.canvas.centerObjectH(img);
          this.canvas.setActiveObject(img);
          this.canvas.renderAll();
        });
      }
    }
    else {
      this.canvas = new fabric.Canvas('canvas', {
        width: this.element.nativeElement.parentElement.clientWidth,
        height: this.element.nativeElement.parentElement.clientHeight
      });
    
      new fabric.Image.fromURL(this.imageUrl, (img) => {
        let oImg = img.set({
            top: 50,
            borderColor: '#e842f4',
            cornerColor: '#e842f4',
            cornerSize: 10,
            cornerStyle: 'circle',
            transparentCorners: false  
          });
        oImg.scaleToWidth(this.canvas.getWidth() - 20);
        this.currentImage = oImg;
        this.canvas.add(oImg);
        this.canvas.centerObjectH(oImg);
        this.canvas.setActiveObject(oImg);
        this.canvas.renderAll();
      });
    }
  }

}
