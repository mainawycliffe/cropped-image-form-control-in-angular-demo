import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomImageFormControlComponent } from './custom-image-form-control.component';

describe('CustomImageFormControlComponent', () => {
  let component: CustomImageFormControlComponent;
  let fixture: ComponentFixture<CustomImageFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomImageFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomImageFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
