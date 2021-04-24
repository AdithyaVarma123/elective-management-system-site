import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFillFormComponent } from './page-fill-form.component';

describe('PageFillFormComponent', () => {
  let component: PageFillFormComponent;
  let fixture: ComponentFixture<PageFillFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageFillFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
