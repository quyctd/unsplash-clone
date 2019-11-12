import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CltCreateModalComponent } from './clt-create-modal.component';

describe('CltCreateModalComponent', () => {
  let component: CltCreateModalComponent;
  let fixture: ComponentFixture<CltCreateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CltCreateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CltCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
