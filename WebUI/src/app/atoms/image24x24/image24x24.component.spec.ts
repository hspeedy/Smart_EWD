import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Image24x24Component } from './image24x24.component';

describe('Image24x24Component', () => {
  let component: Image24x24Component;
  let fixture: ComponentFixture<Image24x24Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Image24x24Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Image24x24Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
