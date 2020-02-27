import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionstAddComponent } from './receptionst-add.component';

describe('ReceptionstAddComponent', () => {
  let component: ReceptionstAddComponent;
  let fixture: ComponentFixture<ReceptionstAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionstAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionstAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
