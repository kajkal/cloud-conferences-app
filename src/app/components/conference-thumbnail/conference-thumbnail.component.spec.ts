import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceThumbnailComponent } from './conference-thumbnail.component';

describe('ConferenceThumbnailComponent', () => {
  let component: ConferenceThumbnailComponent;
  let fixture: ComponentFixture<ConferenceThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConferenceThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferenceThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
