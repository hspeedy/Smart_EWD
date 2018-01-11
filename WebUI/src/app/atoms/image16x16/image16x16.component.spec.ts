import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Image16x16Component } from './image16x16.component';

describe('Image16x16Component', () => {
  let component: Image16x16Component;
  let fixture: ComponentFixture<Image16x16Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Image16x16Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Image16x16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
