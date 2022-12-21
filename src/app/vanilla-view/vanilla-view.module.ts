import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VanillaViewComponent } from './vanilla-view.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [VanillaViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: VanillaViewComponent
      }
    ]),
  ]
})
export class VanillaViewModule { }
