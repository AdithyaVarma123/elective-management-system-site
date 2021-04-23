import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageElectivesComponent } from './page-electives.component';

describe('PageElectivesComponent', () => {
  let component: PageElectivesComponent;
  let fixture: ComponentFixture<PageElectivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageElectivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageElectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
