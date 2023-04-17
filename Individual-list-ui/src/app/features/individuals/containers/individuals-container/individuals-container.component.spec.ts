import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualsContainerComponent } from './individuals-container.component';

describe('IndividualsContainerComponent', () => {
  let component: IndividualsContainerComponent;
  let fixture: ComponentFixture<IndividualsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualsContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
