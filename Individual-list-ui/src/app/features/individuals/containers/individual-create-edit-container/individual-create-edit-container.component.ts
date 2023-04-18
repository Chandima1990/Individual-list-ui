import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MessageService } from 'src/app/shared/services';
import { markFormAsDirty } from 'src/app/shared/utils';
import { DeleteConfirmComponent } from '../../components';
import { Address, Individual } from '../../models';
import { IndividualService } from '../../services';
import { atLeastOneAddressValidator, phoneNumberValidator } from '../../validators';

@Component({
  selector: 'app-individual-create-edit-container',
  templateUrl: './individual-create-edit-container.component.html',
  styleUrls: ['./individual-create-edit-container.component.scss']
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
    private dialog: MatDialog,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    // get id from route params
    this.route.params
      .subscribe(params => {
        this.individualId = params['id'];
      });

    //update case
    if (this.individualId) {
      // get the individual from the service by id
      this.individual$ = this.individualService.getIndividualById(this.individualId);

      this.individual$
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe(individual => {

          // create the form with the individual data
          this.individualForm = this.createForm(individual);
          // this.individualForm.patchValue(individual);
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
      phoneNumber: [individual.phoneNumber, [Validators.required, phoneNumberValidator]],
      addresses: this.addressFormArray(individual.addresses),
    }, {
      /**
       * This is a custom validator that checks if at least one address is provided
       * Assumed that it is needed
       */
      validators: atLeastOneAddressValidator
    });

  }

  addressFormArray(addresses: Address[]): FormArray {

    if (!addresses) {
      return this.formBuilder.array([this.formBuilder.group({
        id: [],
        city: [''],
        country: [''],
        street: [''],
        individualId: []
      })]);
    }

    return this.formBuilder.array(addresses?.map(address => {
      return this.formBuilder.group({

        id: [address.id],
        city: [address.city],
        country: [address.country],
        street: [address.street],
        individualId: [address.individualId],

      })
    }));

  }

  addNewAddress() {
    (this.individualForm.get('addresses') as FormArray)
      .push(this.formBuilder.group({
        city: [''],
        country: [''],
        street: [''],
        individualId: [this.individualId],
      }));
  }

  onFormSubmit() {

    if (this.individualForm.invalid) {
      markFormAsDirty(this.individualForm);
      return;
    }

    if (this.individualId) {
      this.individualService
        .updateIndividual(this.individualForm.getRawValue() as Individual)
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe((res) => {
          if (res) {
            this.messageService
              .showSuccess('The record updated successfully')
            this.goBack();
          } else {
            this.messageService
              .showError('Error updating the record, please try again')
          }
        });;
      return;
    }

    this.individualService
      .createIndividual(this.individualForm.getRawValue() as Individual)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        if (res) {
          this.messageService
            .showSuccess('The record created successfully')
          this.goBack();
        } else {
          this.messageService
            .showError('Error creating the record, please try again')
        }
      });
    return;
  }

  /**
   * Open a dialog box to confirm delete
   */
  deleteIndividual() {
    const dialogBox = this.dialog.open(DeleteConfirmComponent);

    dialogBox.afterClosed().pipe(takeUntil(this.unsubscribeAll))
      .subscribe(result => {
        if (result) {
          this.individualService
            .deleteIndividual(this.individualId)
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((res) => {
              if (res) {
                this.messageService
                  .showSuccess('The record deleted successfully')
                this.goBack();
              } else {
                this.messageService
                  .showError('Error deleting the record, please try again')
              }
            });
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
