import { Location } from '@angular/common';
import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AddTodoModule } from './add-todo';
import { routes } from './app-routing.module';
import { HomeModule } from './home';

describe('AppRoutingModule', () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    router.initialNavigation();
  });

  it(`Navigates to 'HomeComponent' when empty path`, fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/home');
  }));

  it(`Navigates to 'HomeComponent' when non-matching path`, fakeAsync(() => {
    router.navigate(['foobar']);
    tick();
    expect(location.path()).toBe('/home');
  }));

  it(`Navigates to 'HomeComponent' when '/home' path`, fakeAsync(() => {
    router.navigate(['home']);
    tick();
    expect(location.path()).toBe('/home');
  }));

  it(`Navigates to 'AddTodoComponent' when '/add-todo' path`, fakeAsync(() => {
    router.navigate(['add-todo']);
    tick();
    expect(location.path()).toBe('/add-todo');
  }));

  it(`Uses lazy loaded 'HomeComponent' when route '/home'`, waitForAsync(() => {
    const route = routes.find(route => route.path === 'home');

    (route.loadChildren as any)().then((lazyLoadedModule) => {
      expect(new lazyLoadedModule()).toBeInstanceOf(HomeModule);
    });
  }));

  it(`Uses lazy loaded 'AddTodoComponent' when route '/add-todo'`, waitForAsync(() => {
    const route = routes.find(route => route.path === 'add-todo');
    

    (route.loadChildren as any)().then((lazyLoadedModule) => {
      expect(new lazyLoadedModule()).toBeInstanceOf(AddTodoModule);
    });
  }));
});