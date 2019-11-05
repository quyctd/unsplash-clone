import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsoreFigureComponent } from './sponsore-figure.component';

describe('SponsoredComponent', () => {
  let component: SponsoreFigureComponent;
  let fixture: ComponentFixture<SponsoreFigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsoreFigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsoreFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
