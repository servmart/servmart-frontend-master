import { FormGroup } from '@angular/forms';
    
export function FieldMatchValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['fieldMatchValidator']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ fieldMatchValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}