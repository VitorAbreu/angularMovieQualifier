import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCollectionsPage } from './movie-collections-page';

describe('MovieCollectionsPage', () => {
  let component: MovieCollectionsPage;
  let fixture: ComponentFixture<MovieCollectionsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCollectionsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCollectionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
