import { NgModule } from '@angular/core';
import { AngularxDatatableComponent } from './angularx-datatable.component';
import {NgbDropdownModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgbdSortableHeaderDirective} from './ngbd-sortable-header.directive';
import {CommonModule} from '@angular/common';



@NgModule({
  declarations: [AngularxDatatableComponent, NgbdSortableHeaderDirective],
  imports: [
    NgbDropdownModule,
    FormsModule,
    TranslateModule,
    CommonModule,
    NgbPaginationModule

  ],
  exports: [AngularxDatatableComponent]
})
export class AngularxDatatableModule { }
