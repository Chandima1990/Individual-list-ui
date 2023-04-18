import {
  AbstractControl,
  FormArray,
  FormControl,
  ValidationErrors,
  ValidatorFn
} from "@angular/forms";

/** At least 1 address need to be added */
export const atLeastOneAddressValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const addressesController = control.get('addresses') as FormArray;

  const invalidLogic = addressesController?.controls?.length === 0;

  if (invalidLogic) {
    addressesController?.setErrors({ required: true })
  }

  return invalidLogic ? { required: true } : null;
};

/**
 * Phone number validator
 */
export const phoneNumberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const phoneNumberController = control as FormControl;
  const allowedPattern = /^\d{10}$/;

  console.log(phoneNumberController?.getRawValue());

  const invalidLogic = !allowedPattern
    .test(phoneNumberController?.getRawValue());

  if (invalidLogic) {
    phoneNumberController?.setErrors({ phoneNumberNotValid: true })
  }

  return invalidLogic ? { phoneNumberNotValid: true } : null;
};
