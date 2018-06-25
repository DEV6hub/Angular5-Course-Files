import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ShirtService } from '../../core/shirt.service';
import { GRAPHICS } from '../../constants/static-data.constants';

@Component({
  selector: 'app-all-graphics',
  templateUrl: './all-graphics.component.html',
  styleUrls: ['./all-graphics.component.css']
})
export class AllGraphicsComponent implements OnInit {
  graphics = GRAPHICS;
  constructor(private shirtService: ShirtService) { }

  ngOnInit() {
  }
  getGraphicImagePath(graphic): string {
    const path = this.shirtService.getGraphicImagePath(graphic);
    return path;
  }
}
