import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SActionComponent } from './s-action.component';

describe('SActionComponent', () => {
  let component: SActionComponent;
  let fixture: ComponentFixture<SActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
