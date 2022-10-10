import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { apiResponseLogin, apiResponseRegister, UserPayload } from '../../interfaces/auth';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  appForm!: FormGroup;
  /**Flag que determina la carga del spinner. */
  loading: boolean = false;
  /**Flag que se utiliza para visualizar el icono del input password y para cambiar el type del input. */
  hide = true;
  /**Flag que se utiliza para visualizar el icono del input confirmPassword y para cambiar el type del input. */
  hideConfirm = true;
  /**Expresión regular que indica que el campo contiene al menos una letra y permite solo espacios en medio. */
  oneLetter = new RegExp(/^\w.+$/);
  /**Expresión regular que indica que el campo solo puede contener letras y numeros sin espacios*/
  noSpaces = new RegExp(/^[A-Za-z0-9]+$/);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private validatorsService: ValidatorsService
  ) {}

  ngOnInit(): void {
    this.appForm = this.fb.group({
      user: ['', [Validators.required, Validators.pattern(this.oneLetter)]],
      password: ['', [Validators.required, Validators.pattern(this.noSpaces)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(this.noSpaces)]]
    }, {
      validators: [this.validatorsService.equalInputs('password','confirmPassword')]
    })
  }
  
  differentPasswords(){
    return (this.appForm.get('confirmPassword')?.touched) && (this.appForm.get('password')?.value !== this.appForm.get('confirmPassword')?.value)
  }

  register() {
    const userName: string = this.appForm.get('user')?.value
    const userClave: string = this.appForm.get('password')?.value
    const checkInData: UserPayload = {
      user: userName.trim(),
      clave: userClave.trim(),
    }
    this.loading = true;
    setTimeout(() => {
      this.authService.userRegister(checkInData).subscribe((apiResponse: apiResponseRegister) => {
        if (apiResponse.id) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '¡Usuario registrado con exito!',
            showConfirmButton: false,
            timer: 2000
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${apiResponse.error}`,
          })
        }
        this.loading = false;
      })
    }, 1000);
  }

  /**Metodo que se ejecuta al darle al icono X. */
  cleanIncon() {
    this.appForm.get('user')?.setValue('');
  }
}
