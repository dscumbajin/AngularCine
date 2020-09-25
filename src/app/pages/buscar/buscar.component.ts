import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public valorBuscado = '';

  constructor(private activatedRoute: ActivatedRoute, private peliculasService: PeliculasService) { }

  ngOnDestroy(): void {
    this.valorBuscado = '';
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.valorBuscado = params.texto;
      this.peliculasService.buscarPeliculas(params.texto)
        .subscribe(movies => {
          this.movies = movies;
        });

    });
  }

}
