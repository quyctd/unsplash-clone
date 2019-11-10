import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergridsComponent } from './usergrids.component';

describe('UsergridsComponent', () => {
  let component: UsergridsComponent;
  let fixture: ComponentFixture<UsergridsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsergridsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergridsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
