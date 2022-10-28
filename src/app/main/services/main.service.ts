import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Place } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private _apiUrl:string = environment.apiUrl;

  constructor(private httpCLient: HttpClient) { }

  /**Retorna todos los lugares*/
  getPlaces(): Observable<Place[]>{
    return this.httpCLient.get<Place[]>(`${this._apiUrl}/api/lugares`)
  }

  /**Retorna un lugar por nombre*/
  getPlaceByName(placeName: string): Observable<Place[]> {
    return this.httpCLient.get<Place[]>(`${this._apiUrl}/api/Lugares/Filtro?filtro=${placeName}`, )
  }

  /**Retorna un lugar por id*/
  getPlaceById(placeId: number): Observable<Place> {
    return this.httpCLient.get<Place>(`${this._apiUrl}/api/Lugares/${placeId}`)
  }
}
