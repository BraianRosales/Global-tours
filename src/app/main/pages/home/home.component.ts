import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Place } from '../../interfaces/index';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /**array de lugares original siempre tiene que haber uno por defecto para que se filtre solo por el mismo */
  places: Place[] = [];
  /**array de lugares a mostrar despues de un filtro estos array se van a ir pisando */
  placesFiltered : Place[] = [];
  /**Form control que retorna un null o un string */
  inputValue = new FormControl<string | null>('');

  constructor(private mainService: MainService, private router: Router) { }

  ngOnInit(): void {
    this.mainService.getPlaces().subscribe((places: Place[]) => {
      this.places = places
      console.log('lugares', this.places);
    })
  }

  close() {
    sessionStorage.clear();
    this.router.navigateByUrl('/auth');
  }

  search() {
    const placesInputValue: Place[] = this.places.filter((place: Place) => place.nombre === this.inputValue.value)
    this.placesFiltered = placesInputValue;
    console.log('lugares filtrados',this.placesFiltered);
    
  }
}
