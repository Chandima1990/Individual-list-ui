import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Success', {
      duration: 3000,
      panelClass: ['success']
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'Error', {
      duration: 3000,
      panelClass: ['error']
    });
  }
}
