import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { InputMovieValidator } from '../../validators/input-movie-validator';

@Directive({
  selector: '[inputMovieDirective]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: InputMovieDirective,
    multi: true
  }]
})
export class InputMovieDirective implements Validator {

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    return InputMovieValidator()(control);
  }
}
