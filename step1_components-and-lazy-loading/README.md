## Step 1 - Components and lazy loading

### Objective

The objective for this step is to understand how to leverage the Angular Router to provide lazy loading benefits to your project.

Why learn this as part of the first step?

That's a great question! It is my belief that understanding how to work with Angular's Router is a vital piece of making a well-oiled SPA. So for the first step we will be creating some lazily loaded components to see how that all works.

### Steps

1. Create a directory for our `home` in `src/app/`.
2. Add a component file (`home.component.ts`) to the `src/app/home` directory.

    <details>
      <summary>Snippet (Click to expand)</summary>
      
      ```TypeScript
      import { Component } from '@angular/core';
         
      @Component({
        styleUrls: ['./home.component.scss'],
        templateUrl: './home.component.html'
      })
      export class HomeComponent {
        title = 'Home Component Works!';
      }
   
      ```

    </details>
    <br>

3. Add a template file (`home.component.html`) to the `src/app/home` directory.

    <details>
      <summary>Snippet (Click to expand)</summary>
      
      ```HTML
      <h1>{{title}}</h1>
      ```

    </details>
    <br>

4. Add an empty style file (`home.component.scss`) to the `src/app/home` directory.
5. Add a module file (`home.module.ts`) to the `src/app/home` directory.

    <details>
      <summary>Snippet (Click to expand)</summary>
        
      ```TypeScript
      import { NgModule } from '@angular/core';
      import { RouterModule } from '@angular/router';
      import { HomeComponent } from './home.component';
      
      @NgModule({
        declarations: [
          HomeComponent
        ],
        imports: [
          RouterModule.forChild([
            {
              path: '',
              component: HomeComponent
            }
          ])
        ]
      })
      export class HomeModule {}

      ```
    </details>
    <br> 

6. Add a test file (`home.component.spec.ts`) to the `src/app/home` directory.

    <details>
      <summary>Snippet (Click to expand)</summary>
    
      ```TypeScript
      import { TestBed } from '@angular/core/testing';
      import { RouterTestingModule } from '@angular/router/testing';
      
      import { HomeComponent } from './home.component';
      import { HomeModule } from './home.module';
      
      describe('HomeComponent', () => {
        beforeEach(async () => {
          await TestBed.configureTestingModule({
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

      ```
    
    </details>
    <br>

7. Add an `index.ts` file to `src/app/home` to expose members to be exported.

    <details>
      <summary>Snippet (Click to expand)</summary>
      
      ```TypeScript
      export { HomeComponent } from './home.component';
      export { HomeModule } from './home.module';

      ```
        
    </details>
    <br>

8. Repeat the above steps to create the `AddTodoComponent` following the same file naming conventions as previously stated.
  
    - Add a directory called `add-todo` in `src/app`.
    - Add the component file (`add-todo.component.ts`) in `src/app/add-todo`.
    - Add the component's template file (`add-todo.component.html`) in `src/app/add-todo`.
    - Add the component's style file (`add-todo.component.scss`) in `src/app/add-todo`.
    - Add the test file (`add-todo.component.spec.ts`) in `src/app/add-todo`.
    - Add a module to group dependencies relevant to adding todos called `add-todo.module.ts`.
    
<br>

9. Modify `app-routing.module.ts` to lazily load our previously defined modules.

    <details>
      <summary>Snippet (Click to expand)</summary>
      
      ```TypeScript
      import { NgModule } from '@angular/core';
      import { Routes, RouterModule } from '@angular/router';
      
      export const routes: Routes = [
        { path: '', redirectTo: 'home', pathMatch: 'full'},
        { path: 'home', loadChildren: () => import('./home/home.module').then(module => module.HomeModule) },
        { path: 'add-todo', loadChildren: () => import('./add-todo/add-todo.module').then(module => module.AddTodoModule) },
        { path: '**', redirectTo: 'home' }
      ];
      
      @NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
      })
      export class AppRoutingModule { }

      ```
        
    </details>
    <br>
    
10. Add tests for `app-routing.module.ts` in the `app-routing.module.spec.ts` file.

    <details>
      <summary>Snippet (Click to expand)</summary>
      
      ```TypeScript
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
      
        beforeEach(async () => {
          await TestBed.configureTestingModule({
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
      
      ```
        
    </details>
    <br>

**If you get stuck at any point please defer to the associated `solution` directory for guidance.**
