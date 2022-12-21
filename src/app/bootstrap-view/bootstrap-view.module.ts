import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootstrapViewComponent } from './bootstrap-view.component';
import {RouterModule} from '@angular/router';
import {AngularxDatatableModule} from '../../../projects/angularx-datatable/src/lib/angularx-datatable.module';



@NgModule({
  declarations: [BootstrapViewComponent],
  imports: [
    CommonModule,
    AngularxDatatableModule,
    RouterModule.forChild([
      {
        path: '',
        component: BootstrapViewComponent
      }
    ]),
  ]
})
export class BootstrapViewModule { }
