import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoundObjectComponent } from './add-found-object.component';

describe('AddFoundObjectComponent', () => {
  let component: AddFoundObjectComponent;
  let fixture: ComponentFixture<AddFoundObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFoundObjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFoundObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
