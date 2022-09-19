import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Place } from '../../interfaces/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.mainService.getPlaces().subscribe((places: Place[]) => {
      console.log('lugares', places);
    })
  }

}
