
import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layouts';

const LAYOUTS = [MainLayoutComponent];

@NgModule({
  declarations: [LAYOUTS],
  imports: [CommonModule,

    //Material imports
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,

    RouterModule
  ]
})
export class BaseModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: BaseModule
  ) {
    if (parentModule) {
      throw new Error('BaseModule is already loaded. Import only in AppModule');
    }
  }
}
