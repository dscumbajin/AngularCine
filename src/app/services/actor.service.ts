import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActorResponse } from '../interfaces/actor-response';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  get params() {
    return {
      api_key: 'b011351e2fd654ea2aeb07507ee01c13',
      language: 'es-ES'
    };
  }

  constructor(private http: HttpClient) { }

  getActorDetalle(id: string) {
    return this.http.get<ActorResponse>(`${url}/person/${id}`,
      { params: this.params }).pipe(
        catchError(err => of(null))
      );
  }
}
