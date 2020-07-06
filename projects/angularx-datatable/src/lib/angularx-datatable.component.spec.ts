import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularxDatatableComponent } from './angularx-datatable.component';

describe('AngularxDatatableComponent', () => {
  let component: AngularxDatatableComponent;
  let fixture: ComponentFixture<AngularxDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularxDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularxDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
