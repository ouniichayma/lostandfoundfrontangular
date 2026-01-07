import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLostObjectComponent } from './add-lost-object.component';

describe('AddLostObjectComponent', () => {
  let component: AddLostObjectComponent;
  let fixture: ComponentFixture<AddLostObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLostObjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLostObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
