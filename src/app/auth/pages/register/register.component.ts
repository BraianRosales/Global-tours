import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { apiResponseLogin, apiResponseRegister, UserPayload } from '../../interfaces/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  appForm!: FormGroup;
  btnLoading: boolean = false;
  error: unknown = '';
  /**Flag que se utiliza para visualizar el icono del input password y para cambiar el type del input. */
  hide = true;
  /**Flag que se utiliza para visualizar el icono del input confirmPassword y para cambiar el type del input. */
  hideConfirm = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.appForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
  }

  register() {
    const checkInData: UserPayload = {
      user: this.appForm.get('user')?.value,
      clave: this.appForm.get('password')?.value
    }
    this.btnLoading = true;
    setTimeout(() => {
      this.authService.userRegister(checkInData).subscribe((res: apiResponseRegister) => {
        if (res.id) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '¡Usuario registrado con exito!',
            showConfirmButton: false,
            timer: 2000
          })
        }else { 
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${res.error}`,
          })
        }
      })
      this.btnLoading = false;
    }, 1000);
  }

  /**Metodo que se ejecuta al darle al icono X. */
  cleanIncon(){
    this.appForm.get('user')?.setValue('');
  }
}
