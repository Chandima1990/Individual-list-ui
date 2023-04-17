import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, OnInit, Output
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PagedData } from 'src/app/shared/models';
import { Individual } from '../../models/individual.models';

@Component({
  selector: 'app-individuals',
  templateUrl: './individuals.component.html',
  styleUrls: ['./individuals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class IndividualsComponent implements OnInit  {

  @Input() individualsData!: PagedData<Individual>;
  @Input() pageSize: number = 10;
  @Input() page: number = 1;
  @Input() length: number = 0;

  @Output() pageChangedEmitter: EventEmitter<number> = new EventEmitter();
  @Output() pageSizeChangedEmitter: EventEmitter<number> = new EventEmitter();

  displayedColumns: string[] = ['name', 'ageInYears', 'phoneNumber', 'addresses'];
  dataSource = new MatTableDataSource<Individual>();

  ngOnInit(): void {

    this.dataSource.data = this.individualsData.data;

  }

  pageChanged(event: any) {
    this.pageChangedEmitter.emit(event.pageIndex + 1);
    this.pageSizeChangedEmitter.emit(event.pageSize);
  }

}
