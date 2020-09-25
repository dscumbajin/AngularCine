import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieDetails } from '../interfaces/movie-details';
import { Cast, CreditsResponse } from '../interfaces/credits-response';
import { environment } from 'src/environments/environment';

const url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private carteleraPage = 1;
  public cargando = false;


  get params() {
    return {
      api_key: 'b011351e2fd654ea2aeb07507ee01c13',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    };
  }
  constructor(private http: HttpClient) { }

  getCartelera(): Observable<Movie[]> {

    if (this.cargando) {
      // Cast para evitar el undefind
      return of([]);
    }
    // console.log('cargando API');
    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${url}/movie/now_playing`, { params: this.params })
      .pipe(
        map((resp) => resp.results),
        tap(() => {
          this.carteleraPage += 1;
          this.cargando = false;
        })
      );
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  buscarPeliculas(query: string): Observable<Movie[]> {
    const params = { ...this.params, page: '1', query };
    return this.http.get<CarteleraResponse>(`${url}/search/movie`, { params })
      .pipe(
        map(resp => resp.results)
      );
  }

  getPeliculaDetalle(id: string) {
    return this.http.get<MovieDetails>(`${url}/movie/${id}`, { params: this.params })
      .pipe(
        catchError(err => of(null))
      );
  }
  getCast(id: string): Observable<Cast[]> {
    return this.http.get<CreditsResponse>(`${url}/movie/${id}/credits`, { params: this.params })
      .pipe(
        map(resp => resp.cast),
        catchError(err => of([]))
      );
  }
}
