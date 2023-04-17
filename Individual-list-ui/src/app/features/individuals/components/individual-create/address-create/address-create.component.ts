import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-create',
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressCreateComponent {
  @Input() formItem!: FormGroup;
  @Input() place!: number;
  @Input() individualForm!: FormGroup;

  removeAddress() {
    (this.individualForm.get('addresses') as FormArray)
      .removeAt(this.place);
  }

}
