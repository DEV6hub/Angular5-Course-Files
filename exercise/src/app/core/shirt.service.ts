import { Injectable } from '@angular/core';
import { Shirt, Colour } from '../shared/shirt';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { SHIRTS } from '../constants/static-data.constants';

const SHIRT_IMAGES_PATH = "../../../assets/images/plain-shirts/";
const GRAPHICS_IMAGES_PATH = "../../../assets/images/graphics/";

@Injectable()
export class ShirtService {

    private shirts: Shirt[];
    private editableShirt: Shirt;
    private shirtsSubject: BehaviorSubject<Shirt[]>;
    private editableShirtSubject: BehaviorSubject<Shirt>;

    private lastUsedId: number = 8;

    constructor() {
        this.shirtsSubject = new BehaviorSubject<Shirt[]>([]);
        this.shirts = SHIRTS;
        this.setShirts();
        this.editableShirt = new Shirt();
        this.editableShirt.shirtStyle = "MensShirt";
        this.editableShirt.graphic;
        this.editableShirtSubject = new BehaviorSubject(this.editableShirt);
    }

    private setShirts() {
        this.shirtsSubject.next(this.shirts);
    }

    private emitEditableShirt(): void {
        this.editableShirtSubject.next(this.editableShirt);
    }

    getShirts(): Observable<Shirt[]> {
        return this.shirtsSubject.asObservable();
    }

    getEditableShirt(): Observable<Shirt> {
        return this.editableShirtSubject.asObservable();
    }

    selectStyle(style: string): void {
        this.editableShirt.shirtStyle = style;
        this.emitEditableShirt();
    }

    selectColour(colour): void {
        this.editableShirt.shirtColour = colour;
        this.emitEditableShirt();
    }

    selectGraphicColour(colour: Colour): void {
        this.editableShirt.graphic.colour = colour;
        this.emitEditableShirt();
    }

    updateShirtText(text): void {
        this.editableShirt.text.value = text.toUpperCase();
        this.emitEditableShirt();
    }

    updateShirtTextFont(font): void {
        this.editableShirt.text.font = font;
    }

    getStyleImagePath(style?): string {
        return `${SHIRT_IMAGES_PATH}${(style) ? style.imgName : this.editableShirt.shirtStyle}-${this.editableShirt.shirtColour.name.toLowerCase()}.png`;
    }

    getGraphicImagePath(graphic?): string {
        const file = `${(graphic) ? graphic.fileName : 
            (this.editableShirt.graphic.fileName !== '' ? this.editableShirt.graphic.fileName : '')}`;
        return (file !== '') ? `${GRAPHICS_IMAGES_PATH}${file}` : '';
    }

    isStyleSelected(style): boolean {
        return style.imgName === this.editableShirt.shirtStyle;
    }

    // getShirt(id: number): Shirt {

    //     this.getShirts().subscribe((shirts) => {
    //         return shirts.filter(shirt => shirt.id === id);
    //     });
        

    // }

    duplicateShirt(shirt: Shirt): void {

        let idx: number = this.shirts.findIndex(s => s.id === shirt.id);
        if (idx !== -1) {
            const duplicatedShirt = Object.assign(new Shirt(), shirt, { id: ++this.lastUsedId });
            this.shirts.push(duplicatedShirt);
            this.shirtsSubject.next(this.shirts);
        }
    }

    deleteShirt(shirt: Shirt): void {
        
        let idx: number = this.shirts.findIndex(existingShirt => existingShirt.id === shirt.id);
        if ( idx != -1 ) {
            this.shirts.splice(idx, 1);
            this.shirtsSubject.next(this.shirts);
        }
    }

    getShoppingCartShirts(): Shirt[] {
        return this.shirts.filter(s => s.id === 4 || s.id === 3 || s.id === 8 || s.id === 1 || s.id === 7);
    }
}

