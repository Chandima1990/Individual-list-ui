import { FormGroup } from "@angular/forms";

export function markFormAsDirty(updateForm: FormGroup) {
  Object.keys(updateForm.controls).forEach((key) => {
    updateForm.get(key)?.markAsTouched();
    updateForm.get(key)?.markAsDirty();
    updateForm.get(key)?.updateValueAndValidity();
  });
}
