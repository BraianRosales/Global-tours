import { Component, Input, OnInit } from '@angular/core';
import { Place } from 'src/app/main/interfaces';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  /**array de lugares original siempre tiene que haber uno por defecto para que se filtre solo sobre este mismo*/
  @Input() allPlaces: Place[] = [] 
  /**array de lugares a mostrar despues de un filtro estos array se van a ir pisando */
  @Input() placesFiltered : Place[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
