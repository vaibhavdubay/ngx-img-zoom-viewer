import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NGXImgZoomViewerComponent } from './ngx-img-zoom-viewer.component';

describe('NGXImgZoomViewerComponent', () => {
  let component: NGXImgZoomViewerComponent;
  let fixture: ComponentFixture<NGXImgZoomViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NGXImgZoomViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NGXImgZoomViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
