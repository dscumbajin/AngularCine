import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { Cast } from '../../interfaces/credits-response';

@Component({
  selector: 'app-cast-slide-show',
  templateUrl: './cast-slide-show.component.html',
  styleUrls: ['./cast-slide-show.component.css']
})
export class CastSlideShowComponent implements OnInit, AfterViewInit {

  @Input() cast: Cast[];
  public swiper: Swiper;

  constructor( private router: Router) { }
  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper-container', {
      slidesPerView: 5.3,
      freeMode: true,
      spaceBetween: 15
    });
  }

  ngOnInit(): void {
    // console.log(this.cast);
  }

  onSlidePrev() {

    this.swiper.slidePrev();

  }

  onSlideNext() {
    this.swiper.slideNext();
  }

  onActorClick(cast: Cast){
    this.router.navigate(['/actor', cast.id]);
  }

}
