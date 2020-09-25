import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { BuscarComponent } from './buscar/buscar.component';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { RatingModule } from 'ng-starrating';
import { ActorComponent } from './actor/actor.component';



@NgModule({
  declarations: [
    HomeComponent,
    PeliculaComponent,
    BuscarComponent,
    ActorComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule,
    RatingModule
  ],
  exports: [
    HomeComponent,
    PeliculaComponent,
    BuscarComponent,
    ActorComponent]
})
export class PagesModule { }
