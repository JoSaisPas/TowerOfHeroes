import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDataServiceComponent } from './component-data-service.component';

describe('ComponentDataServiceComponent', () => {
  let component: ComponentDataServiceComponent;
  let fixture: ComponentFixture<ComponentDataServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentDataServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentDataServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
