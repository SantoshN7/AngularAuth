import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';

export function missMatch(controlA: string, controlB: string){
    return (formGroup: FormGroup) => {
      const control1 = formGroup.controls[controlA]; 
      const control2 = formGroup.controls[controlB];
      if (control1.errors) {
        return formGroup;
      }

      if (control1.value !== control2.value) {
          control2.setErrors({
              missMatch: true
          });
      } else {
          control2.setErrors(null);
      }
    }
}