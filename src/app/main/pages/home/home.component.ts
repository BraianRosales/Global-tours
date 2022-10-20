import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Place } from '../../interfaces/index';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  constructor(private mainService: MainService, private router: Router) { 
    this.inputValue.valueChanges.pipe(
      map(userSentence => userSentence?.toLocaleLowerCase().trim()), //mapea la oración del usuario sin espacios por delante ni por detras y transforma toda la oración a minúscula.
      debounceTime(800), //agrega un delay de 800ms.
      distinctUntilChanged(), //identifoca que ultima palabra es distinta a la siguiente para no cortar el flujo.
      filter(userSentence => userSentence !== '' && userSentence?.length! > 2), //filtra las palabras que no esten vacías y que contengan una palabra mayor a 2.
      tap(userSentence =>  this.searchPlacesBySentence(userSentence!)) //por ultimo filtra todos los lugares segun las palabras que ingrese el usuario.
    ).subscribe()
  }


  ngOnInit(): void {
    this.mainService.getPlaces().subscribe((places: Place[]) => {
      this.places = places
      console.log('lugares', this.places);
    })
  }

  /**Este metodo se ejecuta para poder guardar dentro de la propiedad placesFiltered todos los lugares que sean filtrados por el input value del usuario.*/
  searchPlacesBySentence(userSentence: string): void{
    const placesFilterBySentence: Place[] = this.places.filter((place: Place) => this.filterBySentence(place,userSentence))
    // console.log('existe:', this.places[0].nombre.toLocaleLowerCase().startsWith(`${userSentence}`))
    // console.log('nueva lista filtrada: ', placesFilterBySentence);
    this.placesFiltered = placesFilterBySentence;
  }

  /**Retorna true si la oración del usuario ingresada por el input coincide con alguna palabra de los nombres de los lugares. */
  filterBySentence(place: Place, userSentence: string): boolean {
    const listUserSentence: string[] = place.nombre.toLowerCase().split(' ');
    console.log('input del usuario:',userSentence);
    const userInput: string[] = userSentence.split(' ');
    let include: boolean = false;
    listUserSentence.forEach((word: string) => {
      if (word.startsWith(`${userSentence}`) || userInput.includes(word)) {
        include = true;
        return;
      }
    });
    return include;
  }

  /**Cierra la sesión del usuario, limpiando el sessionStorage y retornando a la ruta /auth. 
   * Si se limpia el sessionStorage se elimina el token por lo tanto no es persistente la sesión del usuario.*/
  close(): void {
    sessionStorage.clear();
    this.router.navigateByUrl('/auth');
  }

  /**Resetea la lista de la home. */
  resetList(): void {
    this.placesFiltered = this.places;
  }

















  // search(): void {
  //   // const placesInputValue: Place[] = this.places.filter((place: Place) => place.nombre === this.inputValue.value)
  //   // this.placesFiltered = placesInputValue;
  //   // console.log('lugares filtrados',this.placesFiltered)
  //   const placesInputValue: Place[] = this.places.filter((place: Place) => {
      
  //   })
  // }

  // /**Retorna true si el valor del input tipeado por el usuario existe como palabra en la frase. */
  // searchPlace(sentence: string): boolean {
  //   const listOfWords: string[] = placeInput.split('');  //Separa la frase en una lista de palabras.
  //   const wordExists: boolean =  this.searchWord(listOfWords); //Retorna true si la palabra existe en listOfWords.
  //   return wordExists;
  //   // listOfWords.startsWith('Satur');
  // }

  // // searchWord(listOfWords: string[]): boolean {
  // //     listOfWords.forEach(element => {
  // //       if (element.startsWith(this.inputValue.value!)) {
  // //         return true
  // //       }
  // //     });
  // //     return false;
  // // }

}
