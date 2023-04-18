import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-individual-create-edit',
  templateUrl: './individual-create-edit.component.html',
  styleUrls: ['./individual-create-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndividualCreateComponent {

  @Input() individualForm!: FormGroup;
  @Input() create = true;

  @Output() addNewAddressEmitter: EventEmitter<any> = new EventEmitter();
  @Output() formSubmitEmitter: EventEmitter<any> = new EventEmitter();

  addNewAddress() {
    this.addNewAddressEmitter.emit();
  }

  onFormSubmit() {
    this.formSubmitEmitter.emit();
  }

  /**
   * Getters for form controls
   * Looping through form array,
   * validations, etc.
   */
  get addressesFormArray() {
    return (this.individualForm.get('addresses') as FormArray).controls as [];
  }

  get firstNameControl() {
    return this.individualForm.get('firstName');
  }

  get phoneNumberControl() {
    return this.individualForm.get('phoneNumber');
  }

  get addressControl() {
    return this.individualForm.get('addresses');
  }
}
