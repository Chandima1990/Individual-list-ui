import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualCreateComponent } from './individual-create-edit.component';

describe('IndividualCreateComponent', () => {
  let component: IndividualCreateComponent;
  let fixture: ComponentFixture<IndividualCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
