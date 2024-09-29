import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomemarketsiteComponent } from './homemarketsite.component';

describe('HomemarketsiteComponent', () => {
  let component: HomemarketsiteComponent;
  let fixture: ComponentFixture<HomemarketsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomemarketsiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomemarketsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
