import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarStripComponent } from './toolbar-strip.component';

describe('ToolbarStripComponent', () => {
  let component: ToolbarStripComponent;
  let fixture: ComponentFixture<ToolbarStripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarStripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
