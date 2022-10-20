import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Place } from 'src/app/main/interfaces';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  /**array de lugares a mostrar despues de un filtro estos array se van a ir pisando */
  @Input() placesFiltered : Place[] = [];
  /**flag que retorna true si ya se activo el filtro */

  constructor() { }

  ngOnInit(): void {
    console.log('lista de lugares',this.placesFiltered);
  }

}
