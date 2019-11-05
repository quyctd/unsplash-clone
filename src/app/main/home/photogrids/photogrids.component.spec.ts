import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotogridsComponent } from './photogrids.component';

describe('PhotogridsComponent', () => {
  let component: PhotogridsComponent;
  let fixture: ComponentFixture<PhotogridsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotogridsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotogridsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
