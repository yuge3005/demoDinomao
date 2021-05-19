/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MainDivComponent } from './main-div.component';

describe('MainDivComponent', () => {
  let component: MainDivComponent;
  let fixture: ComponentFixture<MainDivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
