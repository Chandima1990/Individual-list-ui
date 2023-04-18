import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DeleteConfirmComponent } from '../../components';
import { Address, Individual } from '../../models';
import { IndividualService } from '../../services';

@Component({
  selector: 'app-individual-create-container',
  templateUrl: './individual-create-container.component.html',
  styleUrls: ['./individual-create-container.component.scss']
})
export class IndividualCreateContainerComponent implements OnDestroy {

  individualForm!: FormGroup;
  individualId: number = 0;
  unsubscribeAll: Subject<any> = new Subject<any>();

  individual$!: Observable<Individual>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private individualService: IndividualService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    // get id from route params
    this.route.params
      .subscribe(params => {
        this.individualId = params['id'];
      });

    //update case
    if (this.individualId) {
      this.individual$ = this.individualService.getIndividualById(this.individualId);

      this.individual$
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe(individual => {
          this.individualForm = this.createForm(individual);
          this.individualForm.patchValue(individual);
        });

    } else {
      //create case
      this.individualForm = this.createForm({} as Individual);
    }

  }

  createForm(individual: Individual): FormGroup {

    return this.formBuilder.group({
      id: [individual.id],
      firstName: [individual.firstName, [Validators.required]],
      lastName: [individual.lastName],
      ageInYears: [individual.ageInYears],
      phoneNumber: [individual.phoneNumber, [Validators.required]],
      addresses: this.addressFormArray(individual.addresses),
    }, {
      /**
       * This is a custom validator that checks if at least one address is provided
       * Assumed that it is needed
       */
      validators: atLeastOneAddress
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

    if (this.individualForm.invalid) {
      this.individualForm.markAsTouched();
      return;
    }

    if (this.individualId) {
      this.individualService
        .updateIndividual(this.individualForm.getRawValue() as Individual);
      return;
    }

    this.individualService
      .createIndividual(this.individualForm.getRawValue() as Individual)
    return;
  }

  deleteIndividual() {
    const dialogBox = this.dialog.open(DeleteConfirmComponent, {
      width: '250px'
    });

    dialogBox.afterClosed().pipe(takeUntil(this.unsubscribeAll))
      .subscribe(result => {
        if (result) {
          this.individualService.deleteIndividual(this.individualId);
          this.goBack();
        }
      });
  }


  goBack() {
    this.router.navigate(['individuals']);
  }

  /**
   * Unsubscribe all subscriptions on destroy
   * to prevent memory leaks
   */
  ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }
}

/** At least 1 address need to be added */
export const atLeastOneAddress: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const addresses = control.get('addresses') as FormArray;

  const invalid = addresses?.controls?.length === 0;

  if (invalid) {
    addresses.setErrors({ required: true })
  }

  return invalid ? { required: true } : null;
};
