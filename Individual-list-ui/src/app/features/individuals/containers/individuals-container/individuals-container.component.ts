import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IndividualService } from '../../services';

@Component({
  selector: 'app-individuals-container',
  templateUrl: './individuals-container.component.html',
  styleUrls: ['./individuals-container.component.scss']
})
export class IndividualsContainerComponent {

  pageSize: number = 10;
  page: number = 1;

  individuals$ = this.individualService.getAllIndividuals(this.page, this.pageSize);

  constructor(private individualService: IndividualService,
    private router: Router) { }

  addIndividual() {
    this.router
      .navigate(['individuals/create']);
  }

  updateIndividual(id: number) {
    this.router
      .navigate([`individuals/update/${id}`]);
  }

  pageChanged(page: any) {
    this.individuals$ = this.individualService
      .getAllIndividuals(page, this.pageSize);
  }

  pageSizeChanged(pageSize: any) {
    this.individuals$ = this.individualService
      .getAllIndividuals(this.page, pageSize);
  }
}

