import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicFigureComponent } from './basic-figure.component';

describe('BasicFigureComponent', () => {
  let component: BasicFigureComponent;
  let fixture: ComponentFixture<BasicFigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicFigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
