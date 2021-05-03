import {AfterViewChecked, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { asc: 'desc', desc: '', '': 'asc' };

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'div[sortable]',

})
export class NgbdSortableHeaderDirective {
  @Input() sortable: string;
  @Input() direction: SortDirection;
  @Output() sort = new EventEmitter<SortEvent>();

  // @HostBinding('class.asc') get asc(): boolean {
  //   console.log('dss');
  //   return this.direction === 'asc';
  // }
  // @HostBinding('class.desc') get desc(): boolean { return this.direction === 'desc'; }

  @HostListener('click', ['$event.target'])
  onClick(): void {
    this.rotate();
  }
  constructor(private elementRef: ElementRef) {
  }

  public rotate(): void {
    console.log(this.elementRef);
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }

  public updateStatus(direccion: string): void {
    this.direction = direccion as SortDirection;
    this.sort.emit({column: this.sortable, direction: this.direction});
  }

  public reset(): void {
    this.direction = '';
  }

}
