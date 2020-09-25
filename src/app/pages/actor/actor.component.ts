import { Component, OnInit } from '@angular/core';
import { ActorService } from '../../services/actor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorResponse } from 'src/app/interfaces/actor-response';
import { Location } from '@angular/common';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  public actor: ActorResponse;


  constructor(private router: Router, private actorService: ActorService, private activatedRoute: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.getActorDetalles(id);
  }

  getActorDetalles(id: string) {
    this.actorService.getActorDetalle(id)
      .subscribe(actor => {
        if (!actor) {
          this.router.navigateByUrl('/home');
          return;
        }
        this.actor = actor;
      });

  }

  onRegresar() {
    this.location.back();
  }

}
