import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndividualService } from '../../services';

@Component({
  selector: 'app-individuals-container',
  templateUrl: './individuals-container.component.html',
  styleUrls: ['./individuals-container.component.scss']
})
export class IndividualsContainerComponent implements OnInit {

  pageSize: number = 10;
  page: number = 1;

  individuals$ = this.individualService.getAllIndividuals(this.page, this.pageSize);

  constructor(private individualService: IndividualService,
    private router: Router) { }

  ngOnInit(): void {
    this.individualService.getAllIndividuals(this.page, this.pageSize)
  }

  AddIndividual() {
    this.router.navigate(['individuals/create']);
  }

  UpdateIndividual() {
    this.router.navigate(['individuals/edit']);
  }

  pageChanged(event: any) {
    this.individuals$ = this.individualService.getAllIndividuals(event, this.pageSize);
  }

  pageSizeChanged(event: any) {
    this.individuals$ = this.individualService.getAllIndividuals(this.page, event);
  }
}

