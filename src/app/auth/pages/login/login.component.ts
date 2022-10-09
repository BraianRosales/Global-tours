import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserPayload, apiResponseLogin } from '../../interfaces/auth';
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
  /**Flag que determina la carga del spinner. */
  btnLoading: boolean = false;
  
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {}

  /**Flag que se utiliza para visualizar el icono del input password y para cambiar el type del input. */
  hide = true;

  ngOnInit(): void {
    this.appForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  /**Metodo que se ejecuta al darle click al boton ingresar. */
  login() {
    const userData: UserPayload = {
      user: this.appForm.get('user')?.value,
      clave: this.appForm.get('password')?.value
    }
    this.btnLoading = true;
    setTimeout(() => {
      this.authService.login(userData).subscribe((apiResponse: apiResponseLogin) => {
        if (apiResponse.tokenJWT) {
          sessionStorage.setItem('token', apiResponse.tokenJWT);
          this.router.navigateByUrl('/main');
          return;
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${apiResponse.error}`,
        })
        this.btnLoading = false;
      });
    }, 1000);
  }

  /**Metodo que se ejecuta al darle al icono X. */
  cleanIncon(){
    this.appForm.get('user')?.setValue('');
  }
}
