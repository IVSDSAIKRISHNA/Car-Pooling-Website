import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferRidePageComponent } from './offer-ride-page.component';

describe('OfferRidePageComponent', () => {
  let component: OfferRidePageComponent;
  let fixture: ComponentFixture<OfferRidePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferRidePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferRidePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
