import { Component, OnInit, ElementRef, Input, Output, EventEmitter, AfterViewChecked, AfterViewInit } from '@angular/core';
import 'fabric';
import { IText } from 'fabric/fabric-impl';
declare const fabric: any;

@Component({
  selector: 'app-graphic-text-editor',
  templateUrl: './graphic-text-editor.component.html',
  styleUrls: ['./graphic-text-editor.component.css']
})
export class GraphicTextEditorComponent implements OnInit, AfterViewChecked {

  private canvas: fabric.Canvas;
  private currentImage: fabric.Image;
  private currentTextbox: any;
  private _inputText: string;
  private _fontFamily: string;
  private _textColour: string;
  private _imageUrl: string;

  private widthScale: number;
  private heightScale: number;

  @Input()
  set imageUrl(value: string) {
    this._imageUrl = value;
    this.loadImage();
  }

  @Output() inputTextChange = new EventEmitter();

  set inputText(value: string) {
    this._inputText = value;
    this.inputTextChange.emit(this._inputText);
    this.loadText();
  }
  @Input()
  set fontFamily(value: string) {
    this._fontFamily = value;
    this.loadText();
  }
  @Input()
  set textColour(value: string) {
    this._textColour = value;
    this.loadText();
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  @Input()
  get inputText(): string {
    return this._inputText;
  }

  get fontFamily(): string {
    return this._fontFamily;
  }

  get textColour(): string {
    return this._textColour;
  }

  constructor(private element: ElementRef) { }

  ngOnInit() {
    // if (this.imageUrl && this.imageUrl !== '') {
    //   this.loadImage();
    // }
    if (this.inputText && this.inputText !== '') {
      this.loadText();
    }
  }

  ngAfterViewChecked() {
    this.adjustCanvasAndObjectsSize();
  }

  private adjustCanvasAndObjectsSize(): void {

    const w = this.element.nativeElement.parentElement.clientWidth;
    const h = this.element.nativeElement.parentElement.clientHeight;
    let widthOrHeightChanged = false;

    if (this.canvas) {
      const canvasW = this.canvas.getWidth();
      const canvasH = this.canvas.getHeight();

      if (w !== canvasW) {
        this.canvas.setWidth(w);
        widthOrHeightChanged = true;
        this.widthScale = w / canvasW;
      }

      if (h !== canvasH) {
        this.canvas.setHeight(h);
        widthOrHeightChanged = true;
        this.heightScale = h / canvasH;
      }

      if (this.currentImage && widthOrHeightChanged) {   
        this.rescaleImage(this.currentImage);
        this.canvas.renderAll();
      }

      if (this.currentTextbox && widthOrHeightChanged) {
        this.rescaleText(this.currentTextbox);
        this.canvas.renderAll();
      }
    }
  }

  private loadCanvas(): void {
    if (!this.canvas) {
      this.canvas = new fabric.Canvas('canvas', {
        width: this.element.nativeElement.parentElement.clientWidth,
        height: this.element.nativeElement.parentElement.clientHeight
      });
    }
  }

  private rescaleImage(image: fabric.Image): void {
    if (this.widthScale) {
      image.scaleX = image.scaleX * this.widthScale;
      image.left = image.left * this.widthScale;
    }
    if (this.heightScale) {
      image.scaleY = image.scaleY * this.heightScale;
      image.top = image.top * this.heightScale;
    }
  }

  private rescaleText(textbox: any): void {
    if (this.widthScale) {
      textbox.scaleX = this.currentTextbox.scaleX * this.widthScale;
      textbox.left = this.currentTextbox.left * this.widthScale;
    }
    if (this.heightScale) {
      textbox.scaleY = this.currentTextbox.scaleY * this.heightScale;
      textbox.top = this.currentTextbox.top * this.heightScale;
    }
  }


  public loadImage(imgUrl?: string): void {
    const imgUrlToUse = imgUrl || this.imageUrl;
    console.log(imgUrlToUse);

    if (!imgUrlToUse || imgUrlToUse === '') {
      return;
    }

    this.loadCanvas();

    if (this.currentImage) {
      this.currentImage.setSrc(imgUrlToUse, (img) => {
        this.rescaleImage(img);
        this.currentImage = img;
        this.canvas.setActiveObject(img);
        this.canvas.renderAll();
      });
    }
    else {

      new fabric.Image.fromURL(imgUrlToUse, (img) => {
        let oImg = img.set({
            top: 50,
            borderColor: '#e842f4',
            cornerColor: '#e842f4',
            cornerSize: 10,
            cornerStyle: 'circle',
            transparentCorners: false,
            hasRotatingPoint: false,
            centeredScaling: true 
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

  loadText(): void {

    if (!this.inputText || this.inputText === '') {
      return;
    }

    this.loadCanvas();

    if (this.currentTextbox) {
      if (this.inputText) {
        this.currentTextbox.set('text', this.inputText);
      }

      if (this.fontFamily) {
        this.currentTextbox.set('fontFamily', this.fontFamily);
      }

      if (this.textColour) {
        this.currentTextbox.set('fill', this.textColour);
      }
      this.rescaleText(this.currentTextbox);
      this.canvas.setActiveObject(this.currentTextbox);
      this.canvas.renderAll();

    } else {

      this.currentTextbox = new fabric.Textbox(this.inputText, {
        top: 50,
        width: this.canvas.getWidth() - 20,
        fontSize: 68,
        textAlign: 'center',
        borderColor: '#e842f4',
        cornerColor: '#e842f4',
        cornerSize: 10,
        cornerStyle: 'circle',
        transparentCorners: false,
        hasRotatingPoint: false
      });
      this.canvas.add(this.currentTextbox);
      this.canvas.centerObjectH(this.currentTextbox);
      this.canvas.setActiveObject(this.currentTextbox);
      this.canvas.renderAll();

      this.canvas.on('text:changed', () => {
        this.inputText = (this.canvas.getActiveObject() as IText).text;
      });
    }
  }

}
