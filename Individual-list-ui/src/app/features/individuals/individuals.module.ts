
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RouterModule, Routes } from '@angular/router';
import {
  AddressCreateComponent,
  DeleteConfirmComponent,
  IndividualCreateComponent, IndividualsComponent
} from './components';
import {
  IndividualCreateContainerComponent,
  IndividualsContainerComponent
} from './containers';
import { AddressListStringPipe } from './pipes';

//#region const data
const COMPONENTS = [IndividualCreateComponent,
  IndividualsComponent,
  AddressCreateComponent,
  DeleteConfirmComponent];

const CONTAINERS = [IndividualsContainerComponent,
  IndividualCreateContainerComponent];

const PIPES = [AddressListStringPipe];

const routes: Routes = [
  {
    path: '',
    component: IndividualsContainerComponent,
    title : 'Individuals - InSharp Assessment'
  },
  {
    path: "create",
    component: IndividualCreateContainerComponent,
    title : 'Create Individuals - InSharp Assessment'
  },
  {
    path: "update/:id",
    component: IndividualCreateContainerComponent,
    title : 'Update Individuals - InSharp Assessment'
  }
];
//#endregion

@NgModule({
  declarations: [
    COMPONENTS,
    CONTAINERS,
    PIPES
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,

    //Material imports
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatTooltipModule,
    MatCardModule,
    MatDividerModule,

  ],
})

export class IndividualModule { }
