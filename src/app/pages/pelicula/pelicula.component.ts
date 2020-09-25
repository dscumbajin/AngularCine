import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieDetails } from '../../interfaces/movie-details';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public movie: MovieDetails;
  public cast: Cast[] = [];


  constructor(private activatedRoute: ActivatedRoute, private peliculasService: PeliculasService, private location: Location,
              private router: Router) { }

  ngOnInit(): void {

    const { id } = this.activatedRoute.snapshot.params;

    // Multiples Observables ejecucion paralela
    combineLatest([
      this.peliculasService.getPeliculaDetalle(id),
      this.peliculasService.getCast(id)
    ]).subscribe(([movie, cast]) => {
      if (!movie) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.movie = movie;
      this.cast = cast.filter(actor => actor.profile_path != null);

    });
  }

  getPeliculaDetalle(id: string) {
    this.peliculasService.getPeliculaDetalle(id).subscribe(movie => {
      if (!movie) {
        this.router.navigateByUrl('/home');
        return;
      }
      // console.log(movie);
      this.movie = movie;
    });
  }

  getCats(id: string) {
    this.peliculasService.getCast(id).subscribe(cast => {
      if (!cast) {
        this.router.navigateByUrl('/home');
        return;
      }
      // console.log(cast);
      this.cast = cast.filter(actor => actor.profile_path != null);

    });
  }
  onRegresar() {
    this.location.back();
  }

}
