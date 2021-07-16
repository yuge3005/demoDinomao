/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VipPassComponent } from './vip-pass.component';

describe('VipPassComponent', () => {
  let component: VipPassComponent;
  let fixture: ComponentFixture<VipPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VipPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VipPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
