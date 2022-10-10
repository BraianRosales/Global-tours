import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName: string = sessionStorage.getItem('usuario')!;

  constructor(private router:Router) {}

  ngOnInit(): void {}

  signOff() {
    sessionStorage.clear()
    this.router.navigateByUrl('/auth');
  }
}
