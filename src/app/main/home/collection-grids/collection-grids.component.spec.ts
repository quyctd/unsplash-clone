import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionGridsComponent } from './collection-grids.component';

describe('CollectionGridsComponent', () => {
  let component: CollectionGridsComponent;
  let fixture: ComponentFixture<CollectionGridsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionGridsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionGridsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
