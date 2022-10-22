import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Place } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  /**Lista inicial donde guardo una lista de Place. */
  myList: Place[] = [];
  /**Inicializo una variable con referenciamyTravelList donde instansio un BehaviorSubject. */
  myTravelList = new BehaviorSubject<Place[]>([]);
  /**Declaro una variable myTravelList$ donde  guardo myTravelList que sos lo declaro como asObservable (Solo sirve para ser escuchado)*/
  myTravelList$ = this.myTravelList.asObservable();

  constructor() { }

  /**Agrega un lugar a tu lista de lugares a comprar (Checkout), validando que el lugar no este incluido ya que si esta incluido
   * no lo agrega
   */
  addPlaceInCheckout(place: Place) {
    if (this.IdsPlaces().includes(place.id)) {
      return
    }
    this.myList.push(place);
    this.myTravelList.next(this.myList)
  }

  /**Metodo que sirve para remover un lugar de la lista del checkout por medio de su ID */
  removeFromCheckout(idPlace: number) {
    this.myList = this.myList.filter( (place: Place) => place.id !== idPlace );
    this.myTravelList.next(this.myList);
  }

  /**Retorna la lista de ids de todos los lugares que se encuentran dentro del checkout, este metodo sirve de condición
   * para que en el metodo addPlaceInCheckout no podamos agregar un lugar al ckeckout si ya se encuentra dentro del mismo.
   */
  IdsPlaces(): number[] {
    return  this.myList.map((place: Place) =>  place.id);;
  }
}
