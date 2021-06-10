/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ControlBarComponent } from './control-bar.component';

describe('ControlBarComponent', () => {
  let component: ControlBarComponent;
  let fixture: ComponentFixture<ControlBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
