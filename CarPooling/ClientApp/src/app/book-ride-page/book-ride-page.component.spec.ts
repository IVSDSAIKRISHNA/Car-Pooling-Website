import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRidePageComponent } from './book-ride-page.component';

describe('BookRidePageComponent', () => {
  let component: BookRidePageComponent;
  let fixture: ComponentFixture<BookRidePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookRidePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookRidePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
