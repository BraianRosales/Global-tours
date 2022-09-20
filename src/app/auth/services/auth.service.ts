import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { catchError, map, tap } from 'rxjs/operators'

import { UserLoginPayload } from '../interfaces';
import { apiResponseAuth } from '../interfaces/index';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  login(userData: UserLoginPayload) {
    return this.httpClient.post<any>(`${this._apiUrl}/Login`, userData).pipe(
      tap((res: apiResponseAuth) => {
        if (res.tokenJWT) {
          map((res: apiResponseAuth) => res.tokenJWT)
        }
      }),
      catchError(err => of(err))
    )
  }
}
