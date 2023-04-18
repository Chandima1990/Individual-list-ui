import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteConfirmComponent {

  constructor(public dialogRef: MatDialogRef<DeleteConfirmComponent>) { }

  confirmDelete() {
    this.dialogRef.close(true);
  }
}
