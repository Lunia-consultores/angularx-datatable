import {LOCALE_ID, NgModule} from '@angular/core';
import {NgbDropdownModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgbdSortableHeaderDirective} from './ngbd-sortable-header.directive';
import {CommonModule, CurrencyPipe, DatePipe, DecimalPipe, SlicePipe} from '@angular/common';
import {SaveTableConfigurationService} from './save-table-configuration.service';
import {
  AngularxDatatableBootstrapComponent
} from './angularx-datatable-bootstrap/angularx-datatable-bootstrap.component';
import {AngularxDatatableVanillaComponent} from './angularx-datatable-vanilla/angularx-datatable-vanilla.component';
import {AngularxBaseDatatableComponent} from './angularx-base-datatable.component';

@NgModule({
  declarations: [
    NgbdSortableHeaderDirective,
    AngularxBaseDatatableComponent,
    AngularxDatatableBootstrapComponent,
    AngularxDatatableVanillaComponent
  ],
  imports: [
    NgbDropdownModule,
    FormsModule,
    TranslateModule,
    CommonModule,
    NgbPaginationModule,
    ReactiveFormsModule
  ],
  exports: [AngularxBaseDatatableComponent, AngularxDatatableBootstrapComponent, AngularxDatatableVanillaComponent],
  providers: [
    SaveTableConfigurationService,
    DatePipe,
    CurrencyPipe,
    DecimalPipe,
    SlicePipe,
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }
  ]
})
export class AngularxDatatableModule {
}
