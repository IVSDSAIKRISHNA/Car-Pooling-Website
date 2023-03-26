import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLogoComponentComponent } from './home-logo-component.component';

describe('HomeLogoComponentComponent', () => {
  let component: HomeLogoComponentComponent;
  let fixture: ComponentFixture<HomeLogoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLogoComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeLogoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
