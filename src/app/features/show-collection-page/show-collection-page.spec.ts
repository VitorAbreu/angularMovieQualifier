import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCollectionPage } from './show-collection-page';

describe('ShowCollectionPage', () => {
  let component: ShowCollectionPage;
  let fixture: ComponentFixture<ShowCollectionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCollectionPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCollectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
