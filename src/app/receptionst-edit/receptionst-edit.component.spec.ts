import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionstEditComponent } from './receptionst-edit.component';

describe('ReceptionstEditComponent', () => {
  let component: ReceptionstEditComponent;
  let fixture: ComponentFixture<ReceptionstEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionstEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionstEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
