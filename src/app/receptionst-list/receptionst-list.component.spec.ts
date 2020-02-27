import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionstListComponent } from './receptionst-list.component';

describe('ReceptionstListComponent', () => {
  let component: ReceptionstListComponent;
  let fixture: ComponentFixture<ReceptionstListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionstListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionstListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
