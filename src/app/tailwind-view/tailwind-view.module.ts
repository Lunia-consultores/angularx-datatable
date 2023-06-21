import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TailwindViewComponent} from './tailwind-view.component';
import {AngularxDatatableModule} from '../../../projects/angularx-datatable/src/lib/angularx-datatable.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    TailwindViewComponent
  ],
  imports: [
    CommonModule,
    AngularxDatatableModule,
    RouterModule.forChild([
      {
        path: '',
        component: TailwindViewComponent
      }
    ])
  ]
})
export class TailwindViewModule {
}
