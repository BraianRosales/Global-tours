import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import { UserLoginPayload } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  login(userData: UserLoginPayload): Observable<string> {
    // const {User,Clave} = userData
    console.log('payload enviado', userData);
    return this.httpClient.post<any>(`${this._apiUrl}/Login`, userData)
  }
}
