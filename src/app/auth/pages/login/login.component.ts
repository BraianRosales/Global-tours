import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserLoginPayload } from '../../interfaces/index';
import { Router } from '@angular/router';

/**
   * Falta funcionalidad de los iconos del login.
*/
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  appForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.appForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    const userData: UserLoginPayload = {
      user: this.appForm.get('user')?.value,
      clave: this.appForm.get('password')?.value
    }
    this.authService.login(userData).subscribe(res => console.log('respuesta', res))
    // this.router.navigate(['/main'])
  }
}
