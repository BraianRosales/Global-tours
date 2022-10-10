import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { catchError, map, tap } from 'rxjs/operators'
import { apiResponseRegister, UserPayload } from '../interfaces/auth';
import { apiResponseLogin } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**Url principal de la api globalTours. */
  private _apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  /**Metodo de tipo post que se ejecuta al hacer una llamada al endpoint Login. */
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

  /**Metodo de tipo post que se ejecuta al hacer una llamada al endpoint de tipo Usuarios. */
  userRegister(checkInData: UserPayload): Observable<apiResponseRegister> {
    return this.httpClient.post<apiResponseRegister>(`${this._apiUrl}/Usuarios`, checkInData).pipe(
      catchError(err => of(err))
    )
  }

  /**Este metodo se utiliza para verificar si el usuario fue autenticado. */
  authenticationCheck(): Observable<boolean> {
    if (!sessionStorage.getItem('token')) {
      return of(false);
    }
    return of(true)
  }

  /**Metodo que guarda en el sessionStorage el usuario logeado. */
  userNameLogin(userName: string){
    sessionStorage.setItem('usuario',userName);
  }
  
}
