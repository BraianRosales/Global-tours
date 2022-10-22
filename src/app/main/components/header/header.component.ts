import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName: string = sessionStorage.getItem('usuario')!;
  /**Propiedad que retorna la cantidad de lugares que estan dentron del Checkout */
  placesInCheckout: number = 0;

  constructor(private router:Router, private checkoutService: CheckoutService ) {}

  ngOnInit(): void {
    this.checkoutService.myTravelList$.subscribe((placesInCheckout) => {
      this.placesInCheckout = placesInCheckout.length;
    })
  }

  signOff() {
    sessionStorage.clear()
    this.router.navigateByUrl('/auth');
  }
}
