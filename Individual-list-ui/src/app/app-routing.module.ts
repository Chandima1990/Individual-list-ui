import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './base/layouts';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'individuals',
    pathMatch: 'full'
  },
  {
    path: 'individuals',
    component: MainLayoutComponent,
    loadChildren: () => import('./features/individuals').then((m) => m.IndividualModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
  }),
    HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
