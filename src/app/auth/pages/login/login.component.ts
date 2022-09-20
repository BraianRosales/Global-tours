import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserLoginPayload, apiResponseAuth } from '../../interfaces/index';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  btnLoading: boolean = false;
  error: unknown = '';

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
    this.btnLoading = true;
    setTimeout(() => {
      this.authService.login(userData).subscribe((apiResponse: apiResponseAuth) => {
        if (apiResponse.tokenJWT) {
          localStorage.setItem('token', apiResponse.tokenJWT);
          this.router.navigateByUrl('/main');
          return;
        }
        this.error = apiResponse.error;
        Swal.fire(`${this.error}`);
      });
      this.btnLoading = false;
    }, 1500);
  }
}
