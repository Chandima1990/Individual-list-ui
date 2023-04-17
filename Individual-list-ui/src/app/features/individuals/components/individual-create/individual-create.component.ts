import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address, Individual } from '../../models';

@Component({
  selector: 'app-individual-create',
  templateUrl: './individual-create.component.html',
  styleUrls: ['./individual-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndividualCreateComponent implements OnInit {

  individualForm!: FormGroup;
  individual: Individual = {} as Individual;
  create = true;

  constructor(
    protected formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    this.individualForm = this.createForm(this.individual);
  }

  createForm(individual: Individual): FormGroup {

    return this.formBuilder.group({
      id: [individual.id],
      firstName: [individual.firstName, [Validators.required]],
      lastName: [individual.lastName],
      ageInYears: [individual.ageInYears],
      phoneNumber: [individual.phoneNumber, [Validators.required]],
      addresses: this.addressFormArray(individual?.addresses),
    });

  }

  addressFormArray(addresses: Address[]): FormArray {

    if (!addresses) {
      return this.formBuilder.array([this.formBuilder.group({
        id: [''],
        city: [''],
        country: [''],
        street: ['']
      })]);
    }

    return this.formBuilder.array(addresses?.map(address => {
      return this.formBuilder.group({

        id: [address.id],
        city: [address.city],
        country: [address.country],
        street: [address.street]

      })
    }));

  }

  addNewAddress() {
    (this.individualForm.get('addresses') as FormArray)
      .push(this.formBuilder.group({
        id: [''],
        city: [''],
        country: [''],
        street: ['']
      }));
  }

  onFormSubmit() {
    console.log(this.individualForm.value);

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
}
