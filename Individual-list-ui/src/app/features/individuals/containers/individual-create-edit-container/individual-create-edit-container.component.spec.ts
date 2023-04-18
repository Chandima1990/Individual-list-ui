import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualCreateContainerComponent } from './individual-create-edit-container.component';

describe('IndividualCreateContainerComponent', () => {
  let component: IndividualCreateContainerComponent;
  let fixture: ComponentFixture<IndividualCreateContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualCreateContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualCreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
