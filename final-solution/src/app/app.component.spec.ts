import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import Expected = jasmine.Expected;

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);

    component = fixture.componentInstance;

    router.initialNavigation();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title set to 'TODO: Angular Training'`, () => {
    expect(component.title).toBe('TODO: Angular Training');
  });

  it('should render title', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.toolbar-title').textContent).toContain('TODO: Angular Training');
  });

  it('side menu has title "Actions"', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.side-menu__header').textContent).toEqual('Actions');
  });

  it('has two navigation links', () => {
    fixture.detectChanges();

    const navigationLinks = fixture.nativeElement.querySelectorAll('mat-nav-list > mat-list-item');

    expect(navigationLinks.length).toEqual(2);
  });

  it('side menu has "Home" navigation link', () => {
    fixture.detectChanges();

    const navigationLinks = fixture.nativeElement.querySelectorAll('mat-nav-list > mat-list-item');
    const homeNavigationLink = navigationLinks[0];

    const icon = homeNavigationLink.querySelector('mat-icon');
    const span = homeNavigationLink.querySelector('span');

    expect(icon.textContent).toEqual('home');
    expect(span.textContent).toEqual('Home');
  });

  it('side menu has "Add Todo" navigation link', () => {
    fixture.detectChanges();

    const navigationLinks = fixture.nativeElement.querySelectorAll('mat-nav-list > mat-list-item');
    const homeNavigationLink = navigationLinks[1];

    const icon = homeNavigationLink.querySelector('mat-icon');
    const span = homeNavigationLink.querySelector('span');

    expect(icon.textContent).toEqual('add');
    expect(span.textContent).toEqual('Add Todo');
  });
});
