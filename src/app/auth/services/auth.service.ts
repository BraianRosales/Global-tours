import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { catchError, map, tap } from 'rxjs/operators'

import { apiResponseRegister, UserPayload } from '../interfaces/auth';
import { apiResponseLogin } from '../interfaces/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  login(userData: UserPayload): Observable<apiResponseLogin> {
    return this.httpClient.post<apiResponseLogin>(`${this._apiUrl}/Login`, userData).pipe(
      tap((res: apiResponseLogin) => {
        if (res.tokenJWT) {
          map((res: apiResponseLogin) => res.tokenJWT)
        }
      }),
      catchError(err => of(err))
    )
  }

  userRegister(checkInData: UserPayload): Observable<apiResponseRegister> {
    console.log('Payload enviado: ', checkInData);
    return this.httpClient.post<apiResponseRegister>(`${this._apiUrl}/Usuarios`, checkInData).pipe(
      catchError(err => of(err))
    )
  }

  authenticationCheck(): Observable<boolean> {
    if (!sessionStorage.getItem('token')) {
      return of(false);
    }
    return of(true)
  }
  
}
