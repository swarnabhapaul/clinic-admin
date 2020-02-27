import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentAddComponent } from './appoinment-add.component';

describe('AppoinmentAddComponent', () => {
  let component: AppoinmentAddComponent;
  let fixture: ComponentFixture<AppoinmentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppoinmentAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppoinmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
