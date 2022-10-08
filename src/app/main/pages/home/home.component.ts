import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Place } from '../../interfaces/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  places: Place[] = []

  constructor(private mainService: MainService, private router: Router) { }

  ngOnInit(): void {
    this.mainService.getPlaces().subscribe((places: Place[]) => {
      console.log('lugares', places);
      this.places = places
      console.log(this.places);
      
    })
  }

  close(){
    sessionStorage.clear();
    this.router.navigateByUrl('/auth');
  }
}
