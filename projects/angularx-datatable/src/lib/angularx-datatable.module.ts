import { NgModule } from '@angular/core';
import { AngularxDatatableComponent } from './angularx-datatable.component';
import {NgbDropdownModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgbdSortableHeaderDirective} from './ngbd-sortable-header.directive';
import {CommonModule, DatePipe} from '@angular/common';
import {SaveTableConfigurationService} from './save-table-configuration.service';

@NgModule({
  declarations: [AngularxDatatableComponent, NgbdSortableHeaderDirective],
  imports: [
    NgbDropdownModule,
    FormsModule,
    TranslateModule,
    CommonModule,
    NgbPaginationModule,
    ReactiveFormsModule

  ],
  exports: [AngularxDatatableComponent],
  providers: [
    SaveTableConfigurationService,
    DatePipe
  ]
})
export class AngularxDatatableModule { }
