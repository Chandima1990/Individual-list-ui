import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-individual-create-container',
  templateUrl: './individual-create-container.component.html',
  styleUrls: ['./individual-create-container.component.scss']
})
export class IndividualCreateContainerComponent {

  constructor(private router: Router) {

  }

  goBack() {
    this.router.navigate(['individuals']);
  }
}
