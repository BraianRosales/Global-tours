import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  equalInputs( input1: string, input2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {

      const field1: string = formGroup.get(input1)?.value;
      const field2: string = formGroup.get(input2)?.value;

      if (field1 !== field2) {
        return {noEquals: true}
      }
      return null
    }
  }

}
