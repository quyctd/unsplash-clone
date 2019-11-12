import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CltViewComponent } from './clt-view.component';

describe('CltViewComponent', () => {
  let component: CltViewComponent;
  let fixture: ComponentFixture<CltViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CltViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CltViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
