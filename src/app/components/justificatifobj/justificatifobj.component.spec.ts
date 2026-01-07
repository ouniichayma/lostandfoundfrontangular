import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificatifobjComponent } from './justificatifobj.component';

describe('JustificatifobjComponent', () => {
  let component: JustificatifobjComponent;
  let fixture: ComponentFixture<JustificatifobjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JustificatifobjComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JustificatifobjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
