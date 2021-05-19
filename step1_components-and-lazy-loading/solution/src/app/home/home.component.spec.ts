import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';
import { HomeModule } from './home.module';

describe('HomeComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HomeModule,
        RouterTestingModule
      ]
    }).compileComponents();
  });

  it(`should have title 'Home Component Works!'`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;
    expect(component.title).toEqual('Home Component Works!');
  });
});