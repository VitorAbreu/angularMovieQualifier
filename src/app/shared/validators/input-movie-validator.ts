import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function InputMovieValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;

    if(!value) {
      return null;
    }

    const minLength = value.length >= 3;
    const justAlphaNumeric = /^[a-zA-Z0-9]*$/.test(value);

    const inputValid = minLength && justAlphaNumeric;
    return inputValid ? null : {inputMovie: true};
  }
}
