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

  getPlaces(): Observable<Place[]>{
    return this.httpCLient.get<Place[]>(`${this._apiUrl}/api/lugares`)
  }
}
