import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VanillaViewComponent } from './vanilla-view.component';
import {RouterModule} from '@angular/router';
import {AngularxDatatableModule} from '../../../projects/angularx-datatable/src/lib/angularx-datatable.module';



@NgModule({
  declarations: [VanillaViewComponent],
  imports: [
    CommonModule,
    AngularxDatatableModule,
    RouterModule.forChild([
      {
        path: '',
        component: VanillaViewComponent
      }
    ]),
  ]
})
export class VanillaViewModule { }
