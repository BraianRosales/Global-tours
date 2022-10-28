import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Place } from 'src/app/main/interfaces';
import { CheckoutService } from '../../../../services/checkout.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  /**array de lugares a mostrar despues de un filtro estos array se van a ir pisando */
  @Input() placesFiltered : Place[] = [];
  /**esta propiedad retorna la lista total de lugares dentro del Checkout */
  placesInCheckout: Place[] = [];
  /**fue checkeado */
  isChecked: boolean = false;

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    // console.log('lista de lugares',this.placesFiltered);
    this.checkoutService.myTravelList$.subscribe((places: Place[]) => this.placesInCheckout = places)
  }

  /**Agrega un lugar al checkout a travez de checkoutService */
  addPlace(place: Place):void {
    this.checkoutService.addPlaceInCheckout(place)
    console.log('lista dentro del checkout:', this.placesInCheckout)
  }

  /**Retorna true si el lugar se encuentra dentro de la lista actual del checkout*/
  includeInCheckout(place: Place): boolean {
    return this.checkoutService.IdsPlaces().includes(place.id)
  }

  removePlace(place: Place):void {
    this.checkoutService.removeFromCheckout(place.id)
    console.log('lista dentro del checkout:', this.placesInCheckout)
  }
}
