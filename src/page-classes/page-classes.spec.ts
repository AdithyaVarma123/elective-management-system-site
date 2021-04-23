import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageClassesComponent } from './page-classes.component';

describe('PageClassesComponent', () => {
  let component: PageClassesComponent;
  let fixture: ComponentFixture<PageClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
