import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Place } from '../../interfaces/index';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';

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
  /**Flag que determina si se muestra el spinner */
  isLoading$: BehaviorSubject<boolean> = this.spinnerService.isLoading$

  constructor(private mainService: MainService, private router: Router, private spinnerService: SpinnerService) { 
      this.onSearch()
  }

  ngOnInit(): void {
    this.mainService.getPlaces().subscribe((listPlaces: Place[]) => {
      this.places = listPlaces;
      this.placesFiltered = this.places;
    })
  }

  /**Cierra la sesión del usuario, limpiando el sessionStorage y retornando a la ruta /auth 
   * Si se limpia el sessionStorage se elimina el token por lo tanto no es persistente la sesión del usuario*/
  close(): void {
    sessionStorage.clear();
    this.router.navigateByUrl('/auth');
  }

  /**Resetea la lista de la home */
  resetList(): void {
    this.placesFiltered = this.places;
    this.inputValue.reset('')
  }

  /**Metodo donde se ejecuta el inputValue (cuando tipea el usuario) */
  onSearch(): void{
    this.inputValue.valueChanges.pipe(
      map(userSentence => userSentence?.toLocaleLowerCase().trim()), //mapea la oración del usuario sin espacios por delante ni por detras y transforma toda la oración a minúscula.
      debounceTime(800), //agrega un delay de 800ms.
      distinctUntilChanged(), //identifoca que ultima palabra es distinta a la siguiente para no cortar el flujo.
      filter(userSentence => userSentence !== '' && userSentence?.length! > 2), //filtra las palabras que no esten vacías y que contengan una palabra mayor a 2.
      tap(userSentence =>  this.mainService.getPlaceByName(userSentence!) //Hace la petición al servidor y guarda en placesFiltered el resultado del endpoint
        .subscribe((resPlaces: Place[]) => this.placesFiltered = resPlaces))
      ).subscribe()
  }
}
