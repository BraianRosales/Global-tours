import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../services/main.service';
import { Place } from '../../interfaces/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss']
})
export class PlaceDetailComponent implements OnInit {
  place$!: Observable<Place>;

  constructor(private route: ActivatedRoute, private mainService: MainService) { }

  ngOnInit(): void {
    const placeId: number = Number(this.route.snapshot.paramMap.get('id')) ;
    this.place$ = this.mainService.getPlaceById(placeId);
  }
}
